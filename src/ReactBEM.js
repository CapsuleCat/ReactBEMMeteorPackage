// Alias the class builer
let _ = ClassBuilder;

// Shim because ReactDOM sometimes isn't packages
// with react (?)
if (typeof ReactDOM === 'undefined') {
  ReactDOM = React.DOM;

  ReactDOM.findDOMNode = React.findDOMNode;
}

var BEMTransformer = function() {
  this.get_child_modifiers = function(child) {
    if (typeof child === "string")
      return [];

    if (typeof child === "string" || typeof child.props.modifiers !== "string") return [];
    return child.props.modifiers.split(" ");
  };

  this.get_child_bem_element = function(child) {
    if (typeof child.props.bem_element !== "string") return null;
    return child.props.bem_element;
  };

  this.get_tag_name = function(child) {
    var name = ''
    if (typeof child.type === "string") {
      name = child.type
    } else {
      name = child.type.displayName
    }

    return name.toLowerCase().replace("reactdom", "");
  };

  this.get_child_bem_role = function(child) {
    if (typeof child.props.role !== "string") return null;
    return child.props.role;
  };

  this.get_child_element = function(child) {
    if (typeof child === "string")
      return child;

    if (this.get_child_bem_element(child) != null) {
      return this.get_child_bem_element(child);
    } else if (this.get_child_bem_role(child) != null) {
      return this.get_child_bem_role(child);
    } else if (this.get_tag_name(child) != null) {
      return this.get_tag_name(child);
    } else {
      return '';
    }
  };

  this.build_bem_class = function(child, blocks, block_modifiers, translate) {
    var B = blocks,
        BM = block_modifiers,
        E = this.get_child_element(child),
        EM = this.get_child_modifiers(child);

    var classes = [];
    for (var b in B) {
      b = B[b];

      classes.push(_().block(b).element(E).build());

      for (var em in EM) {
        em = EM[em];

        classes.push(_().block(b).element(E).modifier(em).build());
      }

      for (var bm in BM) {
        bm = BM[bm];

        classes.push(_().block(b).modifier(bm).element(E).build());
        for (var em in EM) {
          em = EM[em];
          classes.push(_().block(b).modifier(bm).element(E).modifier(em).build());
        }
      }
    }

    var bem_classes = classes.join(" ");
    return (typeof translate === "function")
        ? translate(bem_classes)
        : bem_classes;
  };

  this.transformElementProps = function(props, fn, blocks, block_modifiers, translate) {
    const changes = {}

    if (typeof props.children === 'object') {
      const transformedChildren = React.Children.map(props.children, function (a) {
        return fn(a, blocks, block_modifiers, translate);
      });

      // If any of the transformedChildren are not equal to their
      // counterpart, then there are changes!

      var diffs = React.Children.count(transformedChildren,
        ((transformed, i) => transformed != children[i])
      );

      if (diffs > 0) {
        changes.children = transformedChildren
      }
    }
  
    for (let key of Object.keys(props)) {
      if (key == 'children') continue
      const value = props[key]
      if (React.isValidElement(value)) {
        const transformed = fn(value, blocks, block_modifiers, translate)
        if (transformed !== value) {
          changes[key] = transformed
        }
      }
    }

    return changes
  }

  this.transform = function(element, blocks, block_modifiers, translate) {
    if (typeof element !== 'object') return element

    const changes = this.transformElementProps(
      element.props,
      this.transform,
      blocks, block_modifiers, translate
    )


    var suffixClasses = (element.props.className ? element.props.className : '');

    changes.className = `${this.build_bem_class(element, blocks, block_modifiers, translate)} ${suffixClasses}`

    return (
      Object.keys(changes).length === 0
      ? element
      : React.cloneElement(element, changes, changes.children || element.props.children)
    )
  }.bind(this);
};

var transformer = new BEMTransformer();

ReactBEM = {
  getInitialState: function() {
    this.bem_blocks = this.bem_blocks || [];
    this.bem_block_modifiers = this.bem_block_modifiers || [];
    return null;
  },

  render: function() {
    return transformer.transform(
        this.bem_render(),
        this.bem_blocks,
        this.bem_block_modifiers,
        this.bem_translate_class
      );
  }
};
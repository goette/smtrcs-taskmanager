var InheritsDomAttributes = {
    componentDidMount: function() {
        var hasNextProps = false;
        var nextProps = {};
        var parentNode = this.getDOMNode().parentNode;

        Object.keys(parentNode.attributes).forEach(function(key) {
            var namedNode;

            // NamedNodeMaps have an attribute named "length" that
            // should not be considered a set attribute.
            if (key !== "length") {
                hasNextProps = true;
                namedNode = parentNode.attributes[key];
                nextProps[namedNode.name] = namedNode.value;
            }
        });

        if (hasNextProps) this.setProps(nextProps);
    }
};

module.exports = InheritsDomAttributes;

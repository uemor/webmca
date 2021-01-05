const satPropagation = function(){
    return {
        // calculate propagations from leaves to roots
        propagate: () => {
            const treeRoots = istar.graph.getSinks();

            for (const root of treeRoots) {
                satPropagation._calcContribution(root, satPropagation);
            }
        },

        // recursively calculate contributions for the element
        _calcContribution: (element) => {
            const children = satPropagation._getChildren(element);
            if (children.length > 0) {
                children.forEach(child => satPropagation._calcContribution(child.source));
                const [color, impact] = satPropagation._colorCombination(children);
                ui.changeColorElement(color, element);
                ui.changeLabelElement(color, element);
                ui.changeImpactElement(impact, element);
                return color;
            } else {
                const color = element.prop('backgroundColor');
                if (color) {
                    ui.changeLabelElement(color, element);
                    ui.changeImpactElement('', element);
                    return color;
                } else {
                    return '#000000';
                }
            }
        },

        // calc color contributions from children
        _colorCombination: (children) => {

            // AND
            if (children.every(child => child.link.prop('type') === 'AndRefinementLink')) {
                return [satPropagation._and(children), ''];
            }
    
            // OR
            if (children.every(child => child.link.prop('type') === 'OrRefinementLink')) {
                return [satPropagation._or(children), ''];
            }
    
            // combine each child with its link
            children = satPropagation._individualPropagation(children);
    
            // combine pairs of children
            let result = children
                .map(child => child.resultColor)
                .reduce((result, color) => satPropagation._pairToPairCombination(
                    result,
                    chroma(color).rgb()
                ), chroma(0, 0, 0).rgb());
    
            return [chroma(result).toString(), satPropagation._calcImpact(children)];
        },
        
        _and: (children) => {
            if (children.every(child => child.source.prop('type') === 'Operationalizing')) {
                if (children.some(child => child.source.prop('backgroundColor') === '#000000')) {
                    return '#000000';
                } else if (children.every(child => child.source.prop('backgroundColor') === '#00FF00')) {
                    return '#00FF00';
                } else {
                    return '#FF0000';
                }
            } else { // NFL
                // TODO
            }
        },

        _or: (children) => {
            if (children.every(child => child.source.prop('type') === 'Operationalizing')) {
                if (children.every(child => child.source.prop('backgroundColor') === '#000000')) {
                    return '#000000';
                } else if (children.some(child => child.source.prop('backgroundColor') === '#00FF00')) {
                    return '#00FF00';
                } else {
                    return '#FF0000';
                }
            } else { // NFL
                // TODO
            }   
        },

        _individualPropagation: (children) => {
            children.forEach(child => {
                // C = child
                // I = contribution (link)
                // P = parent

                // at graph loading we still don't have the colors
                if (!child.source.prop('backgroundColor') || (child.link.prop('type') === 'ContributionLink' && !child.link.prop('backgroundColor'))) {
                    console.warn('Could not get color from child or link');
                    child.resultColor = [0, 0, 0];
                    return;
                }

                const C = chroma(child.source.prop('backgroundColor')).rgb();
                const I = chroma(child.link.prop('backgroundColor')).rgb();
                let P = [0, 0, 0];

                if (I[0] > I[1] && I[0] > I[2]) { // hurt
                    P[0] = C[1] * I[0] / 255.0;
                    P[1] = C[0] * I[0] / 255.0;
                    P[2] = C[2] * I[0] / 255.0;
                } else if (I[1] > I[0] && I[1] > I[2]) { // help
                    P[0] = C[0] * I[1] / 255.0;
                    P[1] = C[1] * I[1] / 255.0;
                    P[2] = C[2] * I[1] / 255.0;
                } else {
                    P[0] = 0;
                    P[1] = 0;
                    P[2] = Math.max(C[0], C[1], C[2]) * I[2] / 255.0;
                }

                child.resultColor = P;
            });
            return children;
        },

        _calcImpact: (children) => {
            const positive = children.filter(c => {
                const rgb = chroma(c.resultColor).rgb();
                return rgb[0] === 0 && rgb[1] > 0 && rgb[2] === 0;
            }).length;

            const negative = children.filter(c => {
                const rgb = chroma(c.resultColor).rgb();
                return rgb[0] > 0 && rgb[1] === 0 && rgb[2] === 0;
            }).length;

            const unknown = children.filter(c => {
                const rgb = chroma(c.resultColor).rgb();
                return rgb[2] > 0 && rgb[0] === 0 && rgb[1] === 0;
            }).length;

            let impacts = [];
            if (positive > 0) {
                impacts = impacts.concat([`${positive}P`]);
            }
            if (negative > 0) {
                impacts = impacts.concat([`${negative}N`]);
            }
            if (unknown > 0) {
                impacts = impacts.concat([`${unknown}U`]);
            }

            return impacts.join('\n');
        },

        _pairToPairCombination: (a, b) => {
            const r = [0, 0, 0];
            for (const i of [0, 1, 2]) {
                r[i] = Math.max(a[i], b[i]);
            }
            return r;
        },

        // returns inbound links and their source elements
        _getChildren: (element) => (istar.graph
            .getConnectedLinks(element, {inbound: true})
            .map(link => ({
                link: link,
                source: istar.graph.getCell(link.source())
            }))
        )
    };
}();

/*
* The Actor, Role, and Agent shapes are structured as follows:
	.element: the circle that represents the actor when collapsed
	text: the text inside the circle, usually representing the name of the actor
	.boundary: the container for the elements that go inside the actor

	Additionally, Agent and Role also contain a path that distinguishes then from the generic Actor element

	A rectangular boundary is used instead of the original circular boundary, to maximize the space available for drawing
*/

joint.shapes.istar.Actor = joint.dia.Element.extend({
    markup: '<g><rect class="boundary" /><circle class="element actorSymbol" /><path /><text class="content"/></g>',
    defaults: joint.util.deepSupplement({
        type: 'Container',
        size: {width: 200, height: 120},
        attrs: {
            '.element': {
                cx: 40,
                cy: 40,
                fill: 'rgb(205,254,205)',
                r: 40,
                stroke: 'black',
                'stroke-width': 2,
                transform: 'translate(-20, -20)'  //displaces the circle a little bit
            },
            text: {
                fill: '#000000',
                'font-family': 'Arial, helvetica, sans-serif',
                'font-size': 12,
                ref: 'circle',//makes the position of the text relative to the circle
                'ref-x': 0.5,
                'ref-y': 0.5,
                text: 'Actor',
                'text-anchor': 'middle',
                'y-alignment': 'middle'
            },
            '.boundary': {
                fill: 'rgb(242,242,242)',
                height: 120,
                rx: 100,
                ry: 40,
                stroke: 'black',
                'stroke-dasharray': '10,5,4,4',
                'stroke-width': 2,
                width: 200
            },
        }
    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.istar.Role = joint.dia.Element.extend({
    markup: '<g><rect class="boundary" /><circle class="element actorSymbol" /><path class="actorDecorator"/><text class="content"/></g>',
    defaults: joint.util.deepSupplement({
        type: 'Container',
        size: {width: 200, height: 120},
        attrs: {
            '.element': {
                cx: 40,
                cy: 40,
                fill: 'rgb(205,254,205)',
                r: 40,
                stroke: 'black',
                'stroke-width': 2,
                transform: 'translate(-20, -20)'  //displaces the circle a little bit
            },
            text: {
                fill: '#000000',
                'font-family': 'Arial, helvetica, sans-serif',
                'font-size': 12,
                ref: 'circle',//makes the position of the text relative to the circle
                'ref-x': 0.5,
                'ref-y': 0.5,
                text: 'Role',
                'text-anchor': 'middle',
                'y-alignment': 'middle'
            },
            '.boundary': {
                fill: 'rgb(242,242,242)',
                height: 120,
                rx: 100,
                ry: 40,
                stroke: 'black',
                'stroke-dasharray': '10,5,4,4',
                'stroke-width': 2,
                width: 200
            },
            path: {
                d: 'm -11 45 q 30 15 62 0',
                fill: 'none',
                stroke: 'black',
                'stroke-width': 1.5
            }
        }
    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.istar.Agent = joint.dia.Element.extend({
    markup: '<g><rect class="boundary"/><circle class="element actorSymbol"/><path class="actorDecorator"/><text class="content"/></g>',
    defaults: joint.util.deepSupplement({
        type: 'Container',
        size: {width: 200, height: 120},
        attrs: {
            '.element': {
                cx: 40,
                cy: 40,
                fill: 'rgb(205,254,205)',
                r: 40,
                stroke: 'black',
                'stroke-width': 2,
                transform: 'translate(-20, -20)'  //displaces the circle a little bit

            },
            text: {
                fill: '#000000',
                'font-family': 'Arial, helvetica, sans-serif',
                'font-size': 12,
                ref: 'circle',//makes the position of the text relative to the circle
                'ref-x': 0.5,
                'ref-y': 0.5,
                text: 'Agent',
                'text-anchor': 'middle',
                'y-alignment': 'middle'
            },
            '.boundary': {
                fill: 'rgb(242,242,242)',
                height: 120,
                rx: 100,
                ry: 40,
                stroke: 'black',
                'stroke-dasharray': '10,5,4,4', //'10,5'
                'stroke-width': 2,
                width: 200
            },
            path: {
                d: 'm -11 -5 62 0',
                fill: 'none',
                stroke: 'black',
                'stroke-width': 1.5
            }
        }
    }, joint.dia.Element.prototype.defaults)
});



joint.shapes.istar.Goal = joint.shapes.basic.Rect.extend({
    markup: '<g class="scalable"><rect class="element"/></g><text class="content"/>',
    defaults: joint.util.deepSupplement({
        type: 'Goal',
        size: {width: 90, height: 35},
        attrs: {
            rect: {
                fill: 'rgb(205,254,205)',
                height: 30,
                rx: 20,
                stroke: 'black',
                'stroke-width': 2,
                'vector-effect': 'non-scaling-stroke', /* prevents stroke distortion when the element is resized */
                width: 130
            },
            text: {
                'font-size': 12,
                'font-weight': 'bold',
                text: 'Goal'
            }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});

joint.shapes.istar.Claim = joint.shapes.basic.Path.extend({
    markup: `<g class="scalable">
                <path class="element"/>
            </g>
            <text class="content"/>
            <text class="rgb-label"/>
            <text class="satisfaction-label"/>
            <text class="impact-label"/>`,
    defaults: joint.util.deepSupplement({
        type: 'Claim',
        size: {width: 90, height: 55},
        attrs: {
            'path': {
                d: 'M44.66,16.15a5.19,5.19,0,0,0-1.8-2.8A5,5,0,0,0,43.71,9a4.77,4.77,0,0,0-4.14-3.73,5.63,5.63,0,0,0-.15-1.07A4.58,4.58,0,0,0,34.11.54a4.19,4.19,0,0,0-3,3.31c-.88-2-2.69-3.27-4.39-2.85a3.64,3.64,0,0,0-2.45,3.17,5.09,5.09,0,0,0-4.38-2.11c-2.31,0-4.23,1.21-4.71,2.84a5.57,5.57,0,0,0-3.64-1.26c-2.67,0-4.83,1.62-4.83,3.63,0,.07,0,.14,0,.21-1.63.62-2.52,2.7-2.13,5C2.25,12.68.43,14.19.43,16s1.84,3.36,4.22,3.59a1.79,1.79,0,0,0,0,.23c-2,.46-3.41,1.82-3.41,3.46,0,2,2.16,3.63,4.84,3.63a6.17,6.17,0,0,0,1.63-.22,3.56,3.56,0,0,0,.11.86c.65,2.59,3.86,4,7.17,3.18a7.49,7.49,0,0,0,2.92-1.45c.71,2.52,3.87,3.89,7.14,3.07a6.23,6.23,0,0,0,4.87-4.64,7,7,0,0,0,4.71.38c3.31-.83,5.46-3.61,4.81-6.2,0-.07-.05-.14-.07-.21a3.81,3.81,0,0,0,2.36.17C44,21.31,45.31,18.74,44.66,16.15Z	', //cloud shape
                fill: 'rgb(255,255,255)',
                resetOffset: true,
                stroke: 'black',
                'stroke-width': 1,
				'stroke-dasharray': '3,3,3,3',
                'vector-effect': 'non-scaling-stroke' /* prevents stroke distortion when the element is resized */
            },
            text: {
                'font-size': 12,
                'font-weight': 'bold',
                text: 'Claim'
            },
            '.rgb-label': {
                //y: '0.0em',
                'ref-dy': '-30%',
                'font-size': 11,
                'font-family': 'monospace',
                'font-weight': 'plain',
                text: 'RGB(255, 255, 255)'
            },
            '.satisfaction-label': {
                text: ' ',
                'ref-dx': '-45%',
                'ref-dy': '-95%',
                'font-size': 24,
                'text-align': 'middle',
                'text-anchor': 'center',
                'font-weight': 'plain',
            },
            '.impact-label': {
                text: ' ',
                'ref-dx': '-175%',
                'ref-dy': '-35%',
                'font-size': 12,
                'text-align': 'middle',
                'text-anchor': 'center',
                'font-weight': 'plain'
            }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});

joint.shapes.istar.Operationalizing = joint.shapes.basic.Path.extend({
    markup: `<g class="scalable">
                <path class="element"/>
            </g>
            <text class="content"/>
            <text class="rgb-label"/>
            <text class="satisfaction-label"/>
            <text class="impact-label"/>`,
    defaults: joint.util.deepSupplement({
        type: 'Operationalizing',
        size: {width: 110, height: 55},
        attrs: {
            'path': {
                d: 'M45.23,16.72a5.15,5.15,0,0,0-1.8-2.8,5,5,0,0,0,.85-4.36,4.74,4.74,0,0,0-4.14-3.73A4.86,4.86,0,0,0,40,4.76c-.65-2.59-3-4.23-5.31-3.65a4.21,4.21,0,0,0-3,3.3c-.87-2-2.68-3.27-4.38-2.84a3.62,3.62,0,0,0-2.46,3.17,5.08,5.08,0,0,0-4.37-2.12c-2.31,0-4.23,1.22-4.72,2.85A5.52,5.52,0,0,0,12.13,4.2c-2.67,0-4.84,1.63-4.84,3.64a1.2,1.2,0,0,0,0,.2c-1.63.62-2.52,2.7-2.13,5C2.82,13.25,1,14.75,1,16.6S2.84,20,5.21,20.19c0,.07,0,.15,0,.22-2,.47-3.41,1.83-3.41,3.46,0,2,2.16,3.64,4.83,3.64a6.25,6.25,0,0,0,1.64-.23,3.24,3.24,0,0,0,.11.87c.65,2.59,3.86,4,7.17,3.18a7.51,7.51,0,0,0,2.92-1.46c.71,2.53,3.87,3.9,7.13,3.08,2.65-.67,4.55-2.58,4.87-4.64a7.05,7.05,0,0,0,4.72.38c3.31-.84,5.46-3.61,4.8-6.2a1.66,1.66,0,0,0-.06-.21,3.88,3.88,0,0,0,2.36.17C44.56,21.88,45.88,19.31,45.23,16.72Z', //cloud shape
                fill: 'rgb(255,255,255)',
                resetOffset: true,
                stroke: 'black',
                'stroke-width': 3,
                'vector-effect': 'non-scaling-stroke' /* prevents stroke distortion when the element is resized */
            },
            '.content': {
                text: 'Operationalizing',
                'font-size': 12,
                'font-weight': 'bold',
                'ref-dy': '-50%',
            },
            '.rgb-label': {
                y: '0.0em',
                'font-size': 11,
                'font-family': 'monospace',
                text: 'RGB(205, 254, 205)'
            },
            '.satisfaction-label': {
                text: ' ',
                'ref-dx': '-35%',
                'ref-dy': '-50%',
                'font-size': 24
            },
            '.impact-label': {
                text: ' ',
                'ref-dx': '-175%',
                'ref-dy': '-50%',
                'font-size': 12,
                'text-align': 'middle',
                'text-anchor': 'center',
                'font-weight': 'bold'
            }
        }
    }, joint.shapes.basic.Polygon.prototype.defaults)
});

joint.shapes.istar.NFR = joint.shapes.basic.Path.extend({
    markup: `<g class="scalable">
                <path class="element"/>
            </g>
            <text class="content"/>
            <text class="rgb-label"/>
            <text class="satisfaction-label"/>
            <text class="impact-label"/>`,
    defaults: joint.util.deepSupplement({
        type: 'NFR',
        size: {width: 90, height: 55},
        attrs: {
            'path': {
                d: 'M44.66,16.15a5.19,5.19,0,0,0-1.8-2.8A5,5,0,0,0,43.71,9a4.77,4.77,0,0,0-4.14-3.73,5.63,5.63,0,0,0-.15-1.07A4.58,4.58,0,0,0,34.11.54a4.19,4.19,0,0,0-3,3.31c-.88-2-2.69-3.27-4.39-2.85a3.64,3.64,0,0,0-2.45,3.17,5.09,5.09,0,0,0-4.38-2.11c-2.31,0-4.23,1.21-4.71,2.84a5.57,5.57,0,0,0-3.64-1.26c-2.67,0-4.83,1.62-4.83,3.63,0,.07,0,.14,0,.21-1.63.62-2.52,2.7-2.13,5C2.25,12.68.43,14.19.43,16s1.84,3.36,4.22,3.59a1.79,1.79,0,0,0,0,.23c-2,.46-3.41,1.82-3.41,3.46,0,2,2.16,3.63,4.84,3.63a6.17,6.17,0,0,0,1.63-.22,3.56,3.56,0,0,0,.11.86c.65,2.59,3.86,4,7.17,3.18a7.49,7.49,0,0,0,2.92-1.45c.71,2.52,3.87,3.89,7.14,3.07a6.23,6.23,0,0,0,4.87-4.64,7,7,0,0,0,4.71.38c3.31-.83,5.46-3.61,4.81-6.2,0-.07-.05-.14-.07-.21a3.81,3.81,0,0,0,2.36.17C44,21.31,45.31,18.74,44.66,16.15Z', //cloud shape
                fill: 'rgb(255,255,255)',
                resetOffset: true,
                stroke: 'black',
                'stroke-width': 1,
                'vector-effect': 'non-scaling-stroke' /* prevents stroke distortion when the element is resized */
            },
            '.content': {
                'font-size': 12,
                'font-weight': 'bold',
                'ref-y': '-65%',
                text: 'NFR',
                'y-alignment': 'middle'
            },
            '.rgb-label': {
                y: '0.0em',
                'font-size': 11,
                'font-family': 'monospace',
                text: 'RGB(255, 255, 255)'
            },
            '.satisfaction-label': {
                text: ' ',
                'ref-dx': '-45%',
                'ref-dy': '-65%',
                'font-size': 24,
                'text-align': 'middle',
                'text-anchor': 'center',
            },
            '.impact-label': {
                text: ' ',
                'ref-dx': '-175%',
                'ref-dy': '-75%',
                'font-size': 12,
                'text-align': 'middle',
                'text-anchor': 'center',
                'font-weight': 'bold'
            }
        }
    }, joint.shapes.basic.Path.prototype.defaults)
});

joint.shapes.istar.ParticipatesInLink = joint.dia.Link.define('ParticipatesInLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-width': 1,
                targetMarker: {
                    'd': 'm 10,-6 l -10,6 10,6',
                    fill: 'none',
                    'stroke-width': 1.2,
                    'type': 'path',
                }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-linecap': 'round',
                'stroke-width': 20
            },
            label: {
                atConnectionRatio: 0.5,
                'font-size': 13,
                'font-weight': 400,
                x: -40,
                y: 4,
                // textPath: {   /* used if we want the text to follow along the line */
                //     selector: 'line',
                //     startOffset: '50%'
                // },
            },
            'label-background': {
                atConnectionRatio: 0.5,
                'font-size': 13,
                'font-weight': 400,
                stroke: 'white',
                'stroke-width': '0.35em',
                x: -40,
                y: 4,
                // textPath: {  /* used if we want the text to follow along the line */
                //     selector: 'line',
                //     startOffset: '50%'
                // },
            }
        },
        source: {selector: '.actorSymbol'},
        target: {selector: '.actorSymbol'}
    },
    {
        markup: [
            {
                className: 'c-connection-wrap',
                selector: 'connection-wrap',
                tagName: 'path'
            },
            {
                selector: 'line',
                tagName: 'path'
            },
            {
                selector: 'label-background',
                tagName: 'text'
            },
            {
                selector: 'label',
                tagName: 'text'
            }
        ]
    }
);

joint.shapes.istar.IsALink = joint.dia.Link.define('IsALink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-width': 1,
                targetMarker: {
                    'd': 'm 10,-6 l -10,6 10,6',
                    fill: 'none',
                    'stroke-width': 1.2,
                    'type': 'path',
                }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-linecap': 'round',
                'stroke-width': 20
            },
            label: {
                atConnectionRatio: 0.5,
                'font-size': 13,
                'font-weight': 400,
                x: -20,
                y: 4,
            },
            'label-background': {
                atConnectionRatio: 0.5,
                'font-size': 13,
                'font-weight': 400,
                stroke: 'white',
                'stroke-width': '0.35em',
                x: -20,
                y: 4,
            }
        },
        source: {selector: '.actorSymbol'},
        target: {selector: '.actorSymbol'}
    },
    {
        markup: [
            {
                className: 'c-connection-wrap',
                selector: 'connection-wrap',
                tagName: 'path'
            },
            {
                selector: 'line',
                tagName: 'path'
            },
            {
                selector: 'label-background',
                tagName: 'text'
            },
            {
                selector: 'label',
                tagName: 'text'
            }
        ]
    }
);

joint.shapes.istar.DependencyLink = joint.dia.Link.define('DependencyLink',
{
    attrs: {
        line: {
            connection: true,
            fill: 'none',
            stroke: 'black',
            'stroke-width': 1
        },
        'connection-wrap': {
            connection: true,
            fill: 'none',
            stroke: 'transparent',
            'stroke-linecap': 'round',
            'stroke-width': 20
        },
        label: {
            atConnectionRatio: 0.5,
            d: 'm 0,-10 l 0,20 4,0 c 10,0, 10 -20, 0,-20 l -4,0',
            // d: 'm 0,-10 l 0,20 c 15,2, 15 -22, 0,-20',
            // d: 'm 0,-10 l 0,20 q 15 -10, 0,-20',
            fill: 'white',
            // fill: 'none',
            stroke: 'black',
            'stroke-width': 2,
        }
    },
    source: {selector: 'text'},
    target: {selector: 'text'}
},
{
    markup: [
        {
            className: 'c-connection-wrap',
            selector: 'connection-wrap',
            tagName: 'path'
        },
        {
            selector: 'line',
            tagName: 'path'
        },
        {
            selector: 'label',
            tagName: 'path'
        }]
}
);

joint.shapes.istar.AndRefinementLink = joint.dia.Link.define('AndRefinementLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-width': 1,
                'targetMarker': {
                    'd': 'm 10,-6 l 0,12',
                    fill: 'none',
                    'stroke-width': 1.2,
                    'type': 'path',
                }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-linecap': 'round',
                'stroke-width': 20
            }
        }
    },
    {
        markup: [
            {
                className: 'c-connection-wrap',
                selector: 'connection-wrap',
                tagName: 'path'
            },
            {
                selector: 'line',
                tagName: 'path'
            }
        ]
    }
);

joint.shapes.istar.OrRefinementLink = joint.dia.Link.define('OrRefinementLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-width': 1,
                targetMarker: {
                    'd': 'm 12,-6 l -12,6 12,6 z',
                     fill: 'black',
                    'stroke-width': 1.2,
                    'type': 'path',
                }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-linecap': 'round',
                'stroke-width': 20
            }
        }
    },
    {
        markup: [
            {
                className: 'c-connection-wrap',
                selector: 'connection-wrap',
                tagName: 'path'
            },
            {
                selector: 'line',
                tagName: 'path'
            }
        ]
    }
);

joint.shapes.istar.NeededByLink = joint.dia.Link.define('NeededByLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-width': 1,
                targetMarker: {
                    d:    'm 1, 0         a 4,4 0 1,0 8,0         a 4,4 0 1,0 -8,0',
                    // d: 'M cx - r, cy   a r,r 0 1,0 (r * 2),0   a r,r 0 1,0 -(r * 2),0', from https://codepen.io/jakob-e/pen/bgBegJ
                    fill: 'black',
                    stroke: 'black',
                    type: 'path', //using path instead of circle to correctly position the circle
                }
                // targetMarker: {
                //     r: 4,
                //     fill: 'black',
                //     stroke: 'black',
                //     'type': 'circle',
                //     x: -10,
                //     y: 10
                // }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-linecap': 'round',
                'stroke-width': 20
            }
        }
    },
    {
        markup: [
            {
                className: 'c-connection-wrap',
                selector: 'connection-wrap',
                tagName: 'path'
            },
            {
                selector: 'line',
                tagName: 'path'
            }
        ]
    }
);

joint.shapes.istar.ContributionLink = joint.dia.Link.define('ContributionLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
				/*'stroke-dasharray': '3,3,3,3',*/
                'stroke-width': 1,
                targetMarker: {
                    'd': 'm 10,-6 l -10,6 10,6',
                    fill: 'none',
                    'stroke-width': 1.2,
                    'type': 'path',
                }
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-linecap': 'round',
                'stroke-width': 20
            },
            smooth: true
        },
        labels: [
            {
                position: 0.4,
                attrs: {
                    text: {
                        'font-family': 'sans-serif',
                        'font-size': 12,
                        'font-weight': 'bold'
                    },
                    rect: {
                        fill: 'rgb(242,242,242)',
                    }
                }
            },
            {
                position: 0.2,
                attrs: {
                    text: {
                        'font-family': 'sans-serif',
                        'font-size': 12,
                        'font-weight': 'normal',
                        text: 'RGB(255, 255, 255)'
                    },
                    rect: {
                        fill: 'rgb(242,242,242)',
                    }
                }
            }
        ],
        source: {selector: 'circle'},
        target: {selector: 'circle'}
    },
    {
        markup: [
            {
                className: 'c-connection-wrap',
                selector: 'connection-wrap',
                tagName: 'path'
            },
            {
                selector: 'line',
                tagName: 'path'
            }
        ]
    }
);

joint.shapes.istar.QualificationLink = joint.dia.Link.define('QualificationLink',
    {
        attrs: {
            line: {
                connection: true,
                fill: 'none',
                stroke: 'black',
                'stroke-dasharray': '10,5',
                'stroke-width': 1
            },
            'connection-wrap': {
                connection: true,
                fill: 'none',
                stroke: 'transparent',
                'stroke-linecap': 'round',
                'stroke-width': 20
            }
        }
    },
    {
        markup: [
            {
                className: 'c-connection-wrap',
                selector: 'connection-wrap',
                tagName: 'path'
            },
            {
                selector: 'line',
                tagName: 'path'
            }
        ]
    }
);

/*definition of globals to prevent undue JSHint warnings*/
/*globals joint:false */
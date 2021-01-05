QUnit.config.collapse = true;

QUnit.test( "Test of QUnit", function( assert ) {
  assert.ok( 1 == "1", "QUnit is running!" );
});

QUnit.module('Elements', {

    beforeEach: function() {
        this.graph = new joint.dia.Graph();
		istar.setupModel(this.graph);
        istar.setupMetamodel(istarcoreMetamodel);
    },

    afterEach: function() {
        delete this.graph;
    }
});

QUnit.test('is empty', function() {
    ok(istar.isEmpty(), 'there are no cells in the model');
    var rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 }, size: { width: 100, height: 30 }
    });
    this.graph.addCell(rect);
    notOk(istar.isEmpty(), 'after adding a cell, it is not empty anymore');
});

QUnit.test('add Actor', function() {
    istar.addActor();
    ok(istar.getElements()[0].isActor());
});
QUnit.test('add Role', function() {
    istar.addRole();
    ok(istar.getElements()[0].isRole());
});
QUnit.test('add Agent', function() {
    istar.addAgent();
    ok(istar.getElements()[0].isAgent());
});
QUnit.test('add Goal', function() {
    istar.addAgent();
    ok(istar.getElements()[0].isAgent());
});
QUnit.test('add NFR', function() {
    istar.addAgent();
    ok(istar.getElements()[0].isAgent());
});
QUnit.test('add Operationalizing', function() {
    istar.addAgent();
    ok(istar.getElements()[0].isAgent());
});
QUnit.test('add Claim', function() {
    istar.addAgent();
    ok(istar.getElements()[0].isAgent());
});
QUnit.test('added element is just it', function() {
    istar.addActor();
    ok(istar.getElements()[0].isActor());
    notOk(istar.getElements()[0].isRole());
    notOk(istar.getElements()[0].isAgent());
    notOk(istar.getElements()[0].isGoal());
    notOk(istar.getElements()[0].isNFR());
    notOk(istar.getElements()[0].isOperationalizing());
    notOk(istar.getElements()[0].isClaim());
});


QUnit.module('ActorLinks', {

    beforeEach: function() {
        this.graph = new joint.dia.Graph();
		istar.setupModel(this.graph);
        istar.setupMetamodel(istarcoreMetamodel);
    },

    afterEach: function() {
        delete this.graph;
    }
});

QUnit.test('add Is-A link from Actor to Actor', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link = istar.addIsALink(el1, el2);
    ok(link.isIsALink());
});
QUnit.test('add Is-A link from Role to Role', function() {
    var el1 = istar.addRole();
    var el2 = istar.addRole();
    var link = istar.addIsALink(el1, el2);
    ok(link.isIsALink());
});
QUnit.test('not able to add Is-A link from Agent to Agent', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addAgent();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Actor to Role', function() {
    var el1 = istar.addActor();
    var el2 = istar.addRole();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Role to Actor', function() {
    var el1 = istar.addRole();
    var el2 = istar.addActor();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Actor to Agent', function() {
    var el1 = istar.addActor();
    var el2 = istar.addAgent();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Agent to Actor', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addActor();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Role to Agent', function() {
    var el1 = istar.addRole();
    var el2 = istar.addAgent();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});
QUnit.test('not able to add Is-A link from Agent to Role', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addRole();
    var link = istar.addIsALink(el1, el2);
    notOk(link);
});

QUnit.test('not add more than one Is-A link between the same actors', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link1 = istar.addIsALink(el1, el2);
    var link2 = istar.addIsALink(el1, el2);
    var link3 = istar.addIsALink(el2, el1);
    ok(link1.isIsALink());
    notOk(link2);
    notOk(link3);
});

QUnit.test('add Participates-In link from Actor to Actor', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Role to Role', function() {
    var el1 = istar.addRole();
    var el2 = istar.addRole();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Agent to Agent', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addAgent();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Actor to Role', function() {
    var el1 = istar.addActor();
    var el2 = istar.addRole();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Role to Actor', function() {
    var el1 = istar.addRole();
    var el2 = istar.addActor();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Actor to Agent', function() {
    var el1 = istar.addActor();
    var el2 = istar.addAgent();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Agent to Actor', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addActor();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Role to Agent', function() {
    var el1 = istar.addRole();
    var el2 = istar.addAgent();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('add Participates-In link from Agent to Role', function() {
    var el1 = istar.addAgent();
    var el2 = istar.addRole();
    var link = istar.addParticipatesInLink(el1, el2);
    ok(link.isParticipatesInLink());
});
QUnit.test('not add more than one Participates-In link between the same actors', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link1 = istar.addParticipatesInLink(el1, el2);
    var link2 = istar.addParticipatesInLink(el1, el2);
    var link3 = istar.addParticipatesInLink(el2, el1);
    ok(link1.isParticipatesInLink());
    notOk(link2);
    notOk(link3);
});

QUnit.test('not add a Participates-In and a Is-A link (in this order) between the same actors ', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link1 = istar.addParticipatesInLink(el1, el2);
    var link2 = istar.addIsALink(el1, el2);
    var link3 = istar.addIsALink(el2, el1);
    ok(link1.isParticipatesInLink());
    notOk(link2);
    notOk(link3);
});
QUnit.test('not add an Is-A and a Participates-In link (in this order) between the same actors ', function() {
    var el1 = istar.addActor();
    var el2 = istar.addActor();
    var link1 = istar.addIsALink(el1, el2);
    var link2 = istar.addParticipatesInLink(el1, el2);
    var link3 = istar.addParticipatesInLink(el2, el1);
    ok(link1.isIsALink());
    notOk(link2);
    notOk(link3);
});


QUnit.module('ElementsLinks', {

    beforeEach: function() {
        this.graph = new joint.dia.Graph();
		istar.setupModel(this.graph);
        istar.setupMetamodel(istarcoreMetamodel);
        createGoalModel(this);
    },

    afterEach: function() {
        delete this.graph;
    }
});

QUnit.test('module ok', function() {
    ok(true);
});

QUnit.test('add And-Refinement from Goal to Goal', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.goal2);
    ok(link1.isAndRefinementLink());
});
QUnit.test('add 1 to M And-Refinements between different Goals', function() {
    var link1 = istar.addAndRefinementLink(this.goal2, this.goal1);
    var link2 = istar.addAndRefinementLink(this.goal3, this.goal1);
    ok(link1.isAndRefinementLink());
    ok(link2.isAndRefinementLink());
});
QUnit.test('add And-Refinement from Goal to Goal', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.goal2);
    ok(link1.isAndRefinementLink());
});
QUnit.test('add And-Refinement from Operationalizing to Operationalizing', function() {
    var link1 = istar.addAndRefinementLink(this.Operationalizing1, this.Operationalizing2);
    ok(link1.isAndRefinementLink());
});
QUnit.test('not add more than 1 And-Refinements between the same pair of Operationalizings', function() {
    var link1 = istar.addAndRefinementLink(this.Operationalizing1, this.Operationalizing2);
    var link2 = istar.addAndRefinementLink(this.Operationalizing1, this.Operationalizing2);
    ok(link1.isAndRefinementLink());
    notOk(link2);
});
QUnit.test('add And-Refinement from Goal to Operationalizing', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.Operationalizing2);
    ok(link1.isAndRefinementLink());
});
QUnit.test('not add more than 1 And-Refinements between the same tuple of Goal,Operationalizing', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.Operationalizing2);
    var link2 = istar.addAndRefinementLink(this.goal1, this.Operationalizing2);
    var link3 = istar.addAndRefinementLink(this.Operationalizing2, this.goal1);
    ok(link1.isAndRefinementLink());
    notOk(link2);
    notOk(link3);
});
QUnit.test('add And-Refinement from Operationalizing to Goal', function() {
    var link1 = istar.addAndRefinementLink(this.Operationalizing1, this.goal2);
    ok(link1.isAndRefinementLink());
});
QUnit.test('not add more than 1 And-Refinements between the same tuple of Operationalizing,Goal', function() {
    var link1 = istar.addAndRefinementLink(this.Operationalizing1, this.goal2);
    var link2 = istar.addAndRefinementLink(this.Operationalizing1, this.goal2);
    var link3 = istar.addAndRefinementLink(this.goal2, this.Operationalizing1);
    ok(link1.isAndRefinementLink());
    notOk(link2);
    notOk(link3);
});
QUnit.test('not allow to add And-Refinement between Goal and NFR', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.NFR1);
    var link2 = istar.addAndRefinementLink(this.NFR2, this.goal2);
    notOk(link1);
    notOk(link2);
});
QUnit.test('not allow to add And-Refinement between Goal and Claim', function() {
    var link1 = istar.addAndRefinementLink(this.goal1, this.Claim1);
    var link2 = istar.addAndRefinementLink(this.Claim2, this.goal1);
    notOk(link1);
    notOk(link2);
});
QUnit.test('not allow to add And-Refinement between Operationalizing and NFR', function() {
    var link1 = istar.addAndRefinementLink(this.Operationalizing1, this.NFR1);
    var link2 = istar.addAndRefinementLink(this.NFR2, this.Operationalizing2);
    notOk(link1);
    notOk(link2);
});
QUnit.test('not allow to add And-Refinement between Operationalizing and Claim', function() {
    var link1 = istar.addAndRefinementLink(this.Operationalizing1, this.Claim1);
    var link2 = istar.addAndRefinementLink(this.Claim2, this.Operationalizing2);
    notOk(link1);
    notOk(link2);
});
QUnit.test('not allow to add And-Refinement between NFR and NFR', function() {
    var link1 = istar.addAndRefinementLink(this.NFR1, this.NFR2);
    notOk(link1);
});
QUnit.test('not allow to add And-Refinement between Claim and Claim', function() {
    var link1 = istar.addAndRefinementLink(this.Claim1, this.Claim2);
    notOk(link1);
});
QUnit.test('not allow to add And-Refinement between NFR and Claim', function() {
    var link1 = istar.addAndRefinementLink(this.NFR1, this.Claim1);
    var link2 = istar.addAndRefinementLink(this.Claim1, this.NFR2);
    notOk(link1);
    notOk(link2);
});

QUnit.test('add Needed-By from Claim to Operationalizing', function() {
    var link1 = istar.addNeededByLink(this.Claim1, this.Operationalizing1);
    ok(link1.isNeededByLink());
});
QUnit.test('not add more than 1 Needed-By between the same tuple of Claim,Operationalizing', function() {
    var link1 = istar.addNeededByLink(this.Claim1, this.Operationalizing1);
    var link2 = istar.addNeededByLink(this.Claim1, this.Operationalizing1);
    ok(link1.isNeededByLink());
    notOk(link2);
});

QUnit.test('only allow valid Needed-By combinations', function() {
    var tuples = [
        {source:this.goal1, target:this.goal2, allow:false},
        {source:this.goal1, target:this.NFR1, allow:false},
        {source:this.goal1, target:this.Operationalizing1, allow:false},
        {source:this.goal1, target:this.Claim1, allow:false},
        {source:this.NFR1, target:this.goal1, allow:false},
        {source:this.NFR1, target:this.NFR2, allow:false},
        {source:this.NFR1, target:this.Operationalizing1, allow:false},
        {source:this.NFR1, target:this.Claim1, allow:false},
        {source:this.Operationalizing1, target:this.goal1, allow:false},
        {source:this.Operationalizing1, target:this.NFR1, allow:false},
        {source:this.Operationalizing1, target:this.Operationalizing2, allow:false},
        {source:this.Operationalizing1, target:this.Claim1, allow:false},
        {source:this.Claim1, target:this.goal1, allow:false},
        {source:this.Claim1, target:this.NFR1, allow:false},
        {source:this.Claim1, target:this.Operationalizing1, allow:true},
        {source:this.Claim1, target:this.Claim2, allow:false},
    ];
    testDifferentNodeLinksCombinations(this, tuples, 'addNeededByLink', 'isNeededByLink');
});
QUnit.test('only allow valid Contribution combinations', function() {
    var tuples = [
        {source:this.goal1, target:this.goal2, allow:false},
        {source:this.goal1, target:this.NFR1, allow:true},
        {source:this.goal1, target:this.Operationalizing1, allow:false},
        {source:this.goal1, target:this.Claim1, allow:false},
        {source:this.NFR1, target:this.goal1, allow:false},
        {source:this.NFR1, target:this.NFR2, allow:true},
        {source:this.NFR1, target:this.Operationalizing1, allow:false},
        {source:this.NFR1, target:this.Claim1, allow:false},
        {source:this.Operationalizing1, target:this.goal1, allow:false},
        {source:this.Operationalizing1, target:this.NFR1, allow:true},
        {source:this.Operationalizing1, target:this.Operationalizing2, allow:false},
        {source:this.Operationalizing1, target:this.Claim1, allow:false},
        {source:this.Claim1, target:this.goal1, allow:false},
        {source:this.Claim1, target:this.NFR1, allow:true},
        {source:this.Claim1, target:this.Operationalizing1, allow:false},
        {source:this.Claim1, target:this.Claim2, allow:false},
    ];
    testDifferentNodeLinksCombinations(this, tuples, 'addContributionLink', 'isContributionLink');
});

QUnit.test('add Qualification from NFR to Goal', function() {
    var link1 = istar.addQualificationLink(this.NFR1, this.goal1);
    ok(link1.isQualificationLink());
});
QUnit.test('add Qualification from NFR to Operationalizing', function() {
    var link1 = istar.addQualificationLink(this.NFR1, this.Operationalizing1);
    ok(link1.isQualificationLink());
});
QUnit.test('add Qualification from NFR to Claim', function() {
    var link1 = istar.addQualificationLink(this.NFR1, this.Claim1);
    ok(link1.isQualificationLink());
});
QUnit.test('not add more than 1 Qualification between the same tuple of NFR,Goal', function() {
    var link1 = istar.addQualificationLink(this.NFR1, this.goal1);
    var link2 = istar.addQualificationLink(this.NFR1, this.goal1);
    ok(link1.isQualificationLink());
    notOk(link2);
});
QUnit.test('only allow valid Qualification combinations', function() {
    var tuples = [
        {source:this.goal1, target:this.goal2, allow:false},
        {source:this.goal1, target:this.NFR1, allow:false},
        {source:this.goal1, target:this.Operationalizing1, allow:false},
        {source:this.goal1, target:this.Claim1, allow:false},
        {source:this.NFR1, target:this.goal1, allow:true},
        {source:this.NFR1, target:this.NFR2, allow:false},
        {source:this.NFR1, target:this.Operationalizing1, allow:true},
        {source:this.NFR1, target:this.Claim1, allow:true},
        {source:this.Operationalizing1, target:this.goal1, allow:false},
        {source:this.Operationalizing1, target:this.NFR1, allow:false},
        {source:this.Operationalizing1, target:this.Operationalizing2, allow:false},
        {source:this.Operationalizing1, target:this.Claim1, allow:false},
        {source:this.Claim1, target:this.goal1, allow:false},
        {source:this.Claim1, target:this.NFR1, allow:false},
        {source:this.Claim1, target:this.Operationalizing1, allow:false},
        {source:this.Claim1, target:this.Claim2, allow:false},
    ];
    testDifferentNodeLinksCombinations(this, tuples, 'addQualificationLink', 'isQualificationLink');
});

function createGoalModel(context) {
    var actor = istar.addActor();

    context.goal1 = istar.addGoal();istar.embedNode(context.goal1, actor);
    context.goal2 = istar.addGoal();istar.embedNode(context.goal2, actor);
    context.goal3 = istar.addGoal();istar.embedNode(context.goal3, actor);
    context.NFR1 = istar.addNFR();istar.embedNode(context.NFR1, actor);
    context.NFR2 = istar.addNFR();istar.embedNode(context.NFR2, actor);
    context.Operationalizing1 = istar.addOperationalizing();istar.embedNode(context.Operationalizing1, actor);
    context.Operationalizing2 = istar.addOperationalizing();istar.embedNode(context.Operationalizing2, actor);
    context.Claim1 = istar.addClaim();istar.embedNode(context.Claim1, actor);
    context.Claim2 = istar.addClaim();istar.embedNode(context.Claim2, actor);
}

function testDifferentNodeLinksCombinations (context, tuples, addFunctionName, isFunctionName) {
    for (var i = 0; i < tuples.length; i++) {
        istar.clearModel();
        createGoalModel(context);
        var link = istar[addFunctionName](tuples[i].source, tuples[i].target);
        var description = tuples[i].source.prop('type') + ' -> ' + tuples[i].target.prop('type');
        description += '  -  isValid:' + tuples[i].allow;
        if (tuples[i].allow) {
                ok(link[isFunctionName](), description);
        }
        else {
            notOk(link, description);
        }
    }
}

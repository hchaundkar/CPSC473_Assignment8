QUnit.test("Data Store", function(assert) {
    var ds = new App.DataStore();
    var obj = ds.getAll();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    assert.deepEqual(obj, {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    }, "The added values are same");
    ds.remove('james@bond.com');
    assert.deepEqual(obj, {
        'm@bond.com': 'tea'
    }, "The added values are same");
    //assert.deepEqual(removedValue,undefined, "The values are removed Successfully" );
    assert.ok(ds.get('m@bond.com'), "The value is fetched Successfully");
    assert.deepEqual(ds.get('james@bond.com'), undefined, "The value fetched do not exist");
});

QUnit.test("Truck", function(assert) {
    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'early grey'
    });
    var printOrders = myTruck.printOrders();
    assert.deepEqual(printOrders, [
        "me@goldfinger.com",
        "dr@no.com",
        "m@bond.com"
    ], "The Print Order values are same");
    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');
    var printOrdersAfterDeletion = myTruck.printOrders();
    assert.deepEqual(printOrdersAfterDeletion, [
        "me@goldfinger.com"
    ], "The Print Order values are me@goldfinger.com");

});

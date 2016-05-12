/**
* Populate DB with sample data on server start
* to disable, edit config/environment/index.js, and set `seedDB: false`
*/

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Terrain from '../api/terrain/terrain.model'

Thing.find({}).remove()
.then(() => {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
        'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
        'Stylus, Sass, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
        'AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep ' +
        'tests alongside code. Automatic injection of scripts and ' +
        'styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more ' +
        'code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript ' +
        'payload, minifies your scripts/css/images, and rewrites asset ' +
        'names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
        'and openshift subgenerators'
    });
});

Terrain.find({}).remove()
.then(() => {
    Terrain.create({
        _id:1,
        name:"eau",
        image:"/assets/images/terrains/eau.png",
        limit:1
    },{
        _id:2,
        name:"desert",
        image:"/assets/images/terrains/desert.png",
        limit:0.2
    },{
        _id:3,
        name:"marais",
        image:"/assets/images/terrains/marais.png",
        limit:0.65
    },{
        _id:4,
        name:"foret",
        image:"/assets/images/terrains/foret.png",
        limit:0.6
    },{
        _id:5,
        name:"plaine",
        image:"/assets/images/terrains/plaine.png",
        limit:0.5
    },{
        _id:6,
        name:"montagne",
        image:"/assets/images/terrains/montagne.png",
        limit:0.3
    });
});

User.find({}).remove()
.then(() => {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
    })
    .then(() => {
        console.log('finished populating users');
    });
});

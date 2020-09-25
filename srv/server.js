const cds = require("@sap/cds");
var passport = require("passport");
var JWTStrategy = require("@sap/xssec").JWTStrategy;
var xsenv = require("@sap/xsenv");

cds.on("bootstrap", app => {
    // passport.use(new JWTStrategy(xsenv.getServices({ xsuaa: { tag: "xsuaa" } }).xsuaa));

    // app.use(passport.initialize());
    // app.use(passport.authenticate("JWT", { session: false }));

    cds.mtx.in(app).then(async () => {
        console.log("XXXXXXXX Overriding Default Provisioning... ");
        const provisioning = await cds.connect.to("ProvisioningService");
        provisioning.impl(require("./provisioning"));
    });
});

// Delegate bootstrapping to built-in server.js
module.exports = cds.server;

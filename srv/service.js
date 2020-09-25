const cds = require("@sap/cds");

module.exports = async function (srv) {
    const db = await cds.connect.to("db"); // connect to database service
    const { Books, Authors } = db.entities; // get reflected definitions

    this.before("READ", "Books", async req => {
        //  does not work
        console.log("XXXXXXXX cds.run");
        const authors1 = await cds.run(SELECT.from(Authors));

        //  does not work
        // console.log("XXXXXXXX pure SELECT");
        // const authors2 = await SELECT.from(Authors);

        //  does not work
        // console.log("XXXXXXXX cds.read");
        // const authors3 = await cds.read(Authors);

        //  does not work
        // console.log("XXXXXXXX srv.run");
        // const authors4 = await srv.run(SELECT.from(Authors));

        //  does not work
        // console.log("XXXXXXXX cds.read");
        // const authors5 = await srv.read(Authors);

        if (1 === 2) {
            return true;
        }
    });

    // Reduce stock of ordered books if available stock suffices
    this.on("submitOrder", async req => {
        const { book, amount } = req.data;
        const n = await UPDATE(Books, book)
            .with({ stock: { "-=": amount } })
            .where({ stock: { ">=": amount } });
        n > 0 || req.error(409, `${amount} exceeds stock for book #${book}`);
    });

    // Add some discount for overstocked books
    this.after("READ", "Books", each => {
        if (each.stock > 111) each.title += ` -- 11% discount!`;
    });
};

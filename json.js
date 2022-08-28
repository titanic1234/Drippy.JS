const fs = require('fs');

const jsonFiles = fs.readdirSync('Server/').filter(file => file.endsWith('.json'));

for (const file of jsonFiles) {
    console.log(file);

    fs.readFile(`Server/${file}`, "utf8", async function (err,data) {
        if (err) {
            console.log(err);
        }


        var json_data = JSON.parse(data);


        Object.keys(json_data["user"]).forEach(member => {
            json_data.user[member.toString()].vergehen.warns = [];
        })

        fs.writeFile(`Server/${file}`, JSON.stringify(json_data), () => {});
    });

}
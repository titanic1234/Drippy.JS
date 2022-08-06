const fs = require('fs');

const jsonFiles = fs.readdirSync('Server/').filter(file => file.endsWith('.json'));

for (const file of jsonFiles) {
    console.log(file);

    fs.readFile(`Server/${file}`, "utf8", async function (err,data) {
        if (err) {
            console.log(err);
        }

        var json_data = JSON.parse(data);
        console.log(json_data.memberjoin);
        json_data.memberjoin.infos.aktiviert = false;
        console.log(json_data.memberjoin);
        json_data.memberjoin.member = {
            "member": {
                "aktiviert": false,
                "title": "Welcome",
                "description": null,
                "color": "#0059ff",
                "thumbnail": true
            }
        };
        console.log(json_data.memberjoin);

        fs.writeFile(`Server/${file}`, JSON.stringify(json_data), () => {});
    });

}
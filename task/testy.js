const fs = require("fs");
const FormData = require("form-data");
const rfs = require("recursive-fs");
const basePathConverter = require("base-path-converter");
const got = require("got");
async function pinDirectoryToPinata() {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const src = "./upload";
    var status = 0;
    try {
        const { dirs, files } = await rfs.read(src);
        let data = new FormData();
        for (const file of files) {
            data.append(`file`, fs.createReadStream(file), {
                filepath: basePathConverter(src, file),
            });
        }
        const response = await got(url, {
            method: 'POST',
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3MDE5OGYwZi02YTlhLTRlODMtYTlmYy0zODMzOGQ2MGE1M2IiLCJlbWFpbCI6ImFwZy5hbGkyMDE4MEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYTZhNjViMDQyODEyYTYxMjAwYTYiLCJzY29wZWRLZXlTZWNyZXQiOiI3ZGQ1OWEwZTgyMWVmZGZiYTk1YjY4MTcwMjYzZWM4YmJjMjQ2MGVlYTQzOGZlZWE1ZjZhZDE5MWRmYmI1OTAzIiwiaWF0IjoxNjY4ODA3MTU1fQ.1i-6V8UNzYSsbEvEUP1fTpbWoM0qMlevr3MmynNsZL0"
            },
            body: data
        })
            .on('uploadProgress', progress => {
                console.log(progress);
            });

        console.log(JSON.parse(response.body));
    } catch (error) {
        console.log(error);
    }
}

pinDirectoryToPinata();
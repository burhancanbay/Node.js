// pm.sendRequest({
//     url: "http://localhost:3003/auth/login",
//     method: "POST",
//     header: {
//         "Content-Type": "application/json"
//     },
//     body: {
//        mode: "raw",
//         raw: JSON.stringify({
//             "name" :  pm.environment.get("name"),
//             "address" :  pm.environment.get("address")
//         })
//     },
// }
// , function (err, res) {
//    pm.collectionVariables.set("token", res.json().accessToken);
// });

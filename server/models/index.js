require("./user");
require("./organisation");
require("./team");
require("./workspace");
require("./taskList");
require("./task");
require("./taskComment");

require("./userOrganisationMap");
require("./userTeamMap");

require("../database/migrate");

// const test = async () => {
//     const [user, userCreated] = await User.findOrCreate({
//         where: {
//             firstName: "Hello",
//             lastName: "World"
//         }
//     });

//     console.log(user.get(), userCreated);

//     const [org, orgCreated] = await Organisation.findOrCreate({
//         where: {
//             name: "Hello",
//             createdBy: user
//         }
//     });

//     console.log(org.get(), orgCreated);

// };

// test();
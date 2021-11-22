// Creating our Jobs model
const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  const Jobs = sequelize.define("Jobs", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200]
        // isAlpha: {
        //   msg: "Name should only contain letters"
        // }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 1000]
      }
    },
    technology: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   is: /^[a-z]+$/i
      // }
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobtype: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Full-Time", "Part-Time", "Contract"]]
      }
    },
    jobcategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Data Entry", "Marketing", "Telecaller",
        "Driver", "Office Assistant", "Delivery",
        "Teacher", "Cook", "Receptionist",
        "Operator Technician", "IT Engineer", "Developer",
        "App Developer", "Web Developer", "Hotel Executive",
        "Travel Executive", "Accountant", "Designer",
        "Security", "Sales Assistant", "Video Editor",
        "Writer", "Events Manager", "Executive",
        "SEO Specialist", "Dancer", "Sound Designer",
        "Packaging Operative", "Advocate Clerk", "Advocate",
        "Tourist Guide", "Housekeeping Assistant", "Chef",
        "Investment Analyst", "Accounts Assistant", "Cleaner",
        "Electrician", "Teacher", "Animator",
        "Photographer", "User Experience Designer", "Product Designer",
        "Textile Designer", "Interior Designer", "Graphic Designer",
        "Road Worker", "Plumber", "Painter",
        "Software Engineer", "Software Developer", "Games Developer",
        "Computer Repair", "IT Support Technician", "Helpdesk Professional",
        "Manager", "Receptionist", "Legal Secretary",
        "Personal Assistant", "Construction Builders", "Labour Worker",
        "Assistant", "Shop Assistant", "Other"]]
      }
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Baksa", "Barpeta", "Biswanath",
        "Bongaigaon", "Cachar", "Charaideo",
        "Chirang", "Darrang", "Dhemaji",
        "Dhubri", "Dibrugarh", "Dima Hasao",
        "Goalpara", "Golaghat", "Hailakandi",
        "Hojai", "Jorhat", "Kamrup",
        "Kamrup Metropolitan", "Karbi Anglong", "Karimganj",
        "Kokrajhar", "Lakhimpur", "Majuli",
        "Morigaon", "Nagaon", "Nalbari",
        "Sivasagar", "Sonitpur", "South Salamara Mankachar",
        "Tinsukia", "Udalguri", "West Karbi Anglong", "Other"]]
      }
    },
    salary: {
      type: DataTypes.DOUBLE
    },
    joblocation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
        // isAlpha: {
        //   msg: "Name should only contain letters"
        // }
      }
    },
    phonenum: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: false,
      validate: {
        isEmail: {
          msg: "Please enter a valid address"
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        isUrl: true,
      }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
  // Syncs with DB
  Jobs.sync();
  return Jobs;
};

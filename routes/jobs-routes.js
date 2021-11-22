/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-arrow-callback */
const db = require("../models");
const { Op } = require("sequelize");


module.exports = function (app) {
//limit: 2,
//offset: 4,
  // GET route for getting all of the jobs
  
  
  app.get("/api/jobs", async function (req, res) {
    
    await db.Jobs.findAll({ 
      limit: 50,
      offset: 0,
       order: [['createdAt', 'DESC']]}).then(function (jobsData) {

      // render 'alljobs' page by providing handlebars object as data from db
      res.render("searchjob", {
        job: jobsData
      });
    });
  });
  // GET route for getting search results for specific keyword
  app.get("/api/jobs/:userSearch", async function (req, res) {

    // Fetch search value from request parameters
    const searchValue = req.params.userSearch;

    console.log("\n\nSearch Value : " + searchValue);
    

    // Find all jobs that matches search value
   await db.Jobs.findAll({
      limit: 50,
      offset: 0,
     order: [['createdAt', 'DESC']],
      where: {
        [Op.or]: [
          {
            //To fetch the Jobs searched by Role
            role: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Technology
            technology: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Company
            company: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Company
            district: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Company
            jobcategory: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by job location
            joblocation: {
              [Op.like]: `%${searchValue}%`
            }
          }
        ]

      }
    })
      .then(function (jobsData) {

        // res.json(jobsData);
        console.log("\n\nSearched data : " + JSON.stringify(jobsData));

        if (jobsData.length > 0) {
          // render 'jobsearch' page by providing handlebars object as data from db   
          res.render("searchjob", {
            job: jobsData
          });
        }
        else {
          // If no jobs available for searched keyword then show 'No Jobs available'
          res.render("error");
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  });





  app.get("/api/jobs/:uSearch", function (req, res) {

    // Fetch search value from request parameters
    const searchValue = req.params.uSearch;

    console.log("\n\nSearch Value : " + searchValue);
    

    // Find all jobs that matches search value
    db.Jobs.findAll({
      limit: 50,
      offset: 0,
        order: [['createdAt', 'DESC']],
      where: {
        [Op.or]: [
          {
            //To fetch the Jobs searched by Role
            role: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Technology
            technology: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Company
            company: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Company
            district: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Company
            jobcategory: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by job location
            joblocation: {
              [Op.like]: `%${searchValue}%`
            }
          }
        ]

      }
    })
      .then(function (jobsData) {

        // res.json(jobsData);
        console.log("\n\nSearched data : " + JSON.stringify(jobsData));

        if (jobsData.length > 0) {
          // render 'jobsearch' page by providing handlebars object as data from db   
          res.render("searchjob", {
            job: jobsData
          });
        }
        else {
          // If no jobs available for searched keyword then show 'No Jobs available'
          res.render("error");
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  });



  app.get("/api/jobs/:uSearch1", function (req, res) {

    // Fetch search value from request parameters
    const searchValue = req.params.uSearch1;

    console.log("\n\nSearch Value : " + searchValue);
    

    // Find all jobs that matches search value
    db.Jobs.findAll({
      limit: 50,
      offset: 0,
       order: [['createdAt', 'DESC']],
      where: {
         
        [Op.or]: [
          {
            //To fetch the Jobs searched by Role
            role: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Technology
            technology: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Company
            company: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Company
            district: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Company
            jobcategory: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by job location
            joblocation: {
              [Op.like]: `%${searchValue}%`
            }
          }
        ]
      
      
      }
    })
      .then(function (jobsData) {

        // res.json(jobsData);
        console.log("\n\nSearched data : " + JSON.stringify(jobsData));

        if (jobsData.length > 0) {
          // render 'jobsearch' page by providing handlebars object as data from db   
          res.render("searchjob", {
            job: jobsData
          });
        }
        else {
          // If no jobs available for searched keyword then show 'No Jobs available'
          res.render("error");
        }

      })
      .catch(function (error) {
        console.log(error);
      });
    
  });




// POST route for saving a new job
app.post("/api/postjob", function(req, res) {
    
  // console.log("Post Job: "+req.body);

  let {
    role,
    description,
    technology,
    company,
    jobtype,
    jobcategory,
    district,
    salary,
    joblocation,
    phonenum,
    contact,
    url
  } = req.body;

  role=uppercase(role);
  
  // Make lowercase and remove space after comma
  technology = technology.toLowerCase().replace(/,[ ]+/g, ",");
  
  // Make lowercase
  company = company.toLowerCase().replace(/,[ ]+/g, ",");
  company=uppercase(company);
  
  // Make lowercase and remove space after comma
  joblocation = joblocation.toLowerCase().replace(/,[ ]+/g, ",");
  joblocation=uppercase(joblocation);

  // Insert Job posted by user into database
  db.Jobs.create({
    role: role,
    description: description,
    technology: technology,
    company: company,
    jobtype: jobtype,
    jobcategory: jobcategory,
    district: district,
    salary: salary,
    joblocation: joblocation,
    phonenum: phonenum,
    contact: contact,
    url: url
    
  // eslint-disable-next-line no-unused-vars
  }).then(function(dbJob) {
    // console.log("\n\nJob Inserted: " + dbJob);
    res.redirect("/success");
  })
    .catch(function(error) {
      console.log(error);
    });
});
};

// Function to make first letter of word uppercase
function uppercase(string)
{
return string.charAt(0).toUpperCase() + string.slice(1);
}
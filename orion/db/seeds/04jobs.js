exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function() {
      // Inserts seed entries
      return knex('jobs').insert([{
          "company": "willie wonkas chocolate factory",
          "job_link": "wonka.com",
          "industry": "Chocolate makin",
          "location": "W. Wonka lane 5555",
          "job_title": "coder for the choclate machines",
          "hiring_manager": "Umpa Loompa",
          "direct_contact_manager": false,
          "recruting_lead": "Willie Wonka",
          "direct_recruiting_manager": true,
          "date_applied": "Mon Jul 17 2017",
          "date_phone_interview": "Mon Jul 17 2017",
          "date_submit": "Mon Jul 17 2017",
          "date_interview": "Wed Jul 19 2017",
          "date_followup": "Wed Jul 19 2017",
          "comments": "come with me and youll see a world of pure imagination",
          "student_id": 1
        },
        {
          "company": "Pokemon",
          "job_link": "pokemon.com",
          "industry": "Training pokemon",
          "location": "W. Pokemon lane 5555",
          "job_title": "coder for the trainers",
          "hiring_manager": "Umpa Loompa",
          "direct_contact_manager": false,
          "recruting_lead": "Ash",
          "direct_recruiting_manager": false,
          "date_applied": "Mon Jul 17 2017",
          "date_phone_interview": "Mon Jul 17 2017",
          "date_submit": "Mon Jul 17 2017",
          "date_interview": "Wed Jul 19 2017",
          "date_followup": "Wed Jul 19 2017",
          "comments": "gotta catch em all",
          "student_id": 1
        },
        {
          "company": "Duder Mifflin Paper Company",
          "job_link": "Paper.com",
          "industry": "Making paper",
          "location": "W. OFFCIE SPACE Rd. 999",
          "job_title": "Printing paper",
          "hiring_manager": "Milton",
          "direct_contact_manager": false,
          "recruting_lead": "Lunberg",
          "direct_recruiting_manager": true,
          "date_applied": "Mon Jul 17 2017",
          "date_phone_interview": "Mon Jul 17 2017",
          "date_submit": "Mon Jul 17 2017",
          "date_interview": "Wed Jul 19 2017",
          "date_followup": "Wed Jul 19 2017",
          "comments": "if you could stay late thatd be great",
          "student_id": 2
        },
        {
          "company": "Pied piper",
          "job_link": "piedpiper.com",
          "industry": "Data compression",
          "location": "Silicon Valley",
          "job_title": "CTO",
          "hiring_manager": "Erlech Bachman",
          "direct_contact_manager": false,
          "recruting_lead": "Gaven Belson",
          "direct_recruiting_manager": true,
          "date_applied": "Mon Jul 17 2017",
          "date_phone_interview": "Mon Jul 17 2017",
          "date_submit": "Mon Jul 17 2017",
          "date_interview": "Wed Jul 19 2017",
          "date_followup": "Wed Jul 19 2017",
          "comments": "Why is Gaven Belson working here",
          "student_id": 3
        },
        {
          "company": "Black-Briar Meadery",
          "job_link": "Black-Briar.com",
          "industry": "selling mead fool",
          "location": "Riften",
          "job_title": "Bartender",
          "hiring_manager": "Ungrien",
          "direct_contact_manager": false,
          "recruting_lead": "Maven Black-Briar",
          "direct_recruiting_manager": true,
          "date_applied": "Mon Jul 17 2017",
          "date_phone_interview": "Mon Jul 17 2017",
          "date_submit": "Mon Jul 17 2017",
          "date_interview": "Wed Jul 19 2017",
          "date_followup": "Wed Jul 19 2017",
          "comments": "you can buy a bottle for 10 gold from Romlyn, and sell it else where for 25 gold",
          "student_id": 4
        }
      ]);
    });
};

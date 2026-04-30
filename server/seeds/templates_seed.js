exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('templates').del();

  // Inserts seed entries
  await knex('templates').insert([
    {
      name: "Portfolio Website",
      description: "Personal portfolio template",
      thumbnail_url: "https://via.placeholder.com/150",
      category: "Portfolio"
    },
    {
      name: "E-commerce UI",
      description: "Online shopping template",
      thumbnail_url: "https://via.placeholder.com/150",
      category: "Ecommerce"
    },
    {
      name: "Blog Platform",
      description: "Blogging website template",
      thumbnail_url: "https://via.placeholder.com/150",
      category: "Blog"
    },
    {
      name: "Admin Dashboard",
      description: "Dashboard UI template",
      thumbnail_url: "https://via.placeholder.com/150",
      category: "Dashboard"
    },
    {
      name: "Landing Page",
      description: "Startup landing page template",
      thumbnail_url: "https://via.placeholder.com/150",
      category: "Marketing"
    }
  ]);
};
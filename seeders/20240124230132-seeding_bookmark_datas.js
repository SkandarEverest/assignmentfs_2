'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bookmarks', [
      {
        movieid:1,
        userid:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movieid:2,
        userid:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movieid:3,
        userid:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movieid:1,
        userid:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movieid:4,
        userid:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookmarks', null,{ truncate: true, cascade: true,restartIdentity:true });
  }
};

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
    await queryInterface.bulkInsert('Movies', [
      {
        title:'title 1',
        synopsis: 'synopsis 1',
        trailerUrl: 'trailerUrl 1',
        imgUrl: 'imgUrl 1',
        rating: 5,
        status: 'status 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'title 2',
        synopsis: 'synopsis 2',
        trailerUrl: 'trailerUrl 2',
        imgUrl: 'imgUrl 2',
        rating: 5,
        status: 'status 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'title 3',
        synopsis: 'synopsis 3',
        trailerUrl: 'trailerUrl 3',
        imgUrl: 'imgUrl 3',
        rating: 5,
        status: 'status 3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'title 4',
        synopsis: 'synopsis 4',
        trailerUrl: 'trailerUrl 4',
        imgUrl: 'imgUrl 4',
        rating: 5,
        status: 'status 4',
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
    await queryInterface.bulkDelete('Movies', null,{ truncate: true, cascade: true,restartIdentity:true })
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Bookmarks', {
      fields: ['userid'],
      type: 'foreign key',
      name: 'user_fk',
      references:{
        table: 'Users',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('Bookmarks', {
      fields: ['movieid'],
      type: 'foreign key',
      name: 'movie_fk',
      references:{
        table: 'Movies',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Bookmarks','user_fk');
    await queryInterface.removeConstraint('Bookmarks','movie_fk');
  }
};

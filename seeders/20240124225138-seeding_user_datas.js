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
       await queryInterface.bulkInsert('Users', [
        {
          username:'user 1',
          email: 'email1@gmail.com',
          password: 'password 1',
          role: 'role 1',
          address: 'address 1',
          phoneNumber: 'phoneNumber 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username:'user 2',
          email: 'email2@gmail.com',
          password: 'password 2',
          role: 'role 2',
          address: 'address 2',
          phoneNumber: 'phoneNumber 2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username:'user 3',
          email: 'email3@gmail.com',
          password: 'password 3',
          role: 'role 3',
          address: 'address 3',
          phoneNumber: 'phoneNumber 3',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username:'user 4',
          email: 'email4',
          password: 'password 4',
          role: 'role 4',
          address: 'address 4',
          phoneNumber: 'phoneNumber 4',
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
    await queryInterface.bulkDelete('Users', null,{ truncate: true, cascade: true,restartIdentity:true });

  }
};

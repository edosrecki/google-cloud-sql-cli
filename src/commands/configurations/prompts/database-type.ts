export const databaseTypePrompt = {
  type: 'list',
  name: 'databaseType',
  message: 'Choose database type:',
  choices: [
    { name: 'Cloud SQL', value: 'cloudsql' },
    { name: 'AlloyDB', value: 'alloydb' },
  ],
}

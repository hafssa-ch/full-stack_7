import swaggerUi from 'swagger-ui-express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Bibliothèque',
    version: '1.0.0',
    description: 'API RESTful pour la gestion d\'une bibliothèque',
    contact: { name: 'Support', email: 'support@bibliotheque.com' }
  },
  servers: [{ url: '/api/v1', description: 'Serveur de développement' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    },
    schemas: {
      Auteur: {
        type: 'object',
        properties: {
          _id: { type: 'string' }, nom: { type: 'string' }, prenom: { type: 'string' },
          dateNaissance: { type: 'string', format: 'date' }, biographie: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }, updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Livre: {
        type: 'object',
        properties: {
          _id: { type: 'string' }, titre: { type: 'string' }, auteur: { type: 'string' },
          isbn: { type: 'string' }, anneePublication: { type: 'number' }, genre: { type: 'array', items: { type: 'string' } },
          resume: { type: 'string' }, disponible: { type: 'boolean' }
        }
      },
      Emprunt: {
        type: 'object',
        properties: {
          _id: { type: 'string' }, livre: { type: 'string' }, utilisateur: { type: 'string' },
          dateEmprunt: { type: 'string', format: 'date-time' }, dateRetourPrevue: { type: 'string', format: 'date' },
          dateRetourEffective: { type: 'string', format: 'date' }, statut: { type: 'string', enum: ['emprunte', 'rendu', 'en_retard'] }
        }
      },
      Utilisateur: {
        type: 'object',
        properties: {
          _id: { type: 'string' }, nom: { type: 'string' }, prenom: { type: 'string' },
          email: { type: 'string' }, role: { type: 'string', enum: ['utilisateur', 'bibliothecaire', 'admin'] }
        }
      },
      RegisterInput: {
        type: 'object', required: ['nom', 'prenom', 'email', 'password'],
        properties: {
          nom: { type: 'string' }, prenom: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' }, role: { type: 'string' }
        }
      },
      LoginInput: {
        type: 'object', required: ['email', 'password'],
        properties: { email: { type: 'string' }, password: { type: 'string' } }
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    // AUTEURS
    '/auteurs': {
      get: {
        tags: ['Auteurs'], summary: 'Récupérer tous les auteurs', security: [],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } }, { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'sort', in: 'query', schema: { type: 'string' } }, { name: 'nom', in: 'query', schema: { type: 'string' } },
          { name: 'prenom', in: 'query', schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Succès', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Auteur' } } } } } }
      },
      post: {
        tags: ['Auteurs'], summary: 'Créer un auteur', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Auteur' } } } },
        responses: { '201': { description: 'Créé' } }
      }
    },
    '/auteurs/{id}': {
      get: {
        tags: ['Auteurs'], summary: 'Obtenir un auteur par ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Succès' }, '404': { description: 'Non trouvé' } }
      },
      put: {
        tags: ['Auteurs'], summary: 'Modifier un auteur', parameters: [{ name: 'id', in: 'path', required: true }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Auteur' } } } },
        responses: { '200': { description: 'Modifié' } }
      },
      delete: {
        tags: ['Auteurs'], summary: 'Supprimer un auteur', parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { '204': { description: 'Supprimé' } }
      }
    },
    // LIVRES
    '/livres': {
      get: {
        tags: ['Livres'], summary: 'Lister les livres', security: [],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } }, { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'sort', in: 'query', schema: { type: 'string' } }, { name: 'titre', in: 'query', schema: { type: 'string' } },
          { name: 'auteur', in: 'query', schema: { type: 'string' } }, { name: 'genre', in: 'query', schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Succès' } }
      },
      post: {
        tags: ['Livres'], summary: 'Ajouter un livre', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Livre' } } } },
        responses: { '201': { description: 'Créé' } }
      }
    },
    '/livres/{id}': {
      get: { tags: ['Livres'], summary: 'Obtenir un livre', parameters: [{ name: 'id', in: 'path', required: true }], responses: { '200': { description: 'Succès' } } },
      put: { tags: ['Livres'], summary: 'Modifier un livre', parameters: [{ name: 'id', in: 'path', required: true }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Livre' } } } }, responses: { '200': { description: 'Modifié' } } },
      delete: { tags: ['Livres'], summary: 'Supprimer un livre', parameters: [{ name: 'id', in: 'path', required: true }], responses: { '204': { description: 'Supprimé' } } }
    },
    // EMPRUNTS
    '/emprunts': {
      get: {
        tags: ['Emprunts'], summary: 'Lister les emprunts', parameters: [
          { name: 'page', in: 'query' }, { name: 'limit', in: 'query' }, { name: 'utilisateur', in: 'query' }, { name: 'statut', in: 'query' }
        ],
        responses: { '200': { description: 'Succès' } }
      },
      post: {
        tags: ['Emprunts'], summary: 'Créer un emprunt', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Emprunt' } } } },
        responses: { '201': { description: 'Créé' } }
      }
    },
    '/emprunts/{id}': {
      get: { tags: ['Emprunts'], summary: 'Obtenir un emprunt', parameters: [{ name: 'id', in: 'path', required: true }], responses: { '200': { description: 'Succès' } } },
      put: { tags: ['Emprunts'], summary: 'Retourner un livre (clôturer l’emprunt)', parameters: [{ name: 'id', in: 'path', required: true }], responses: { '200': { description: 'Retour effectué' } } }
    },
    // UTILISATEURS
    '/utilisateurs/register': {
      post: {
        tags: ['Utilisateurs'], summary: "Inscription d'un nouvel utilisateur", security: [],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterInput' } } } },
        responses: { '201': { description: 'Inscrit' } }
      }
    },
    '/utilisateurs/login': {
      post: {
        tags: ['Utilisateurs'], summary: 'Connexion', security: [],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } } } },
        responses: { '200': { description: 'Token JWT' } }
      }
    },
    '/utilisateurs': {
      get: {
        tags: ['Utilisateurs'], summary: 'Lister les utilisateurs (admin)', parameters: [{ name: 'page', in: 'query' }, { name: 'limit', in: 'query' }],
        responses: { '200': { description: 'Succès' } }
      }
    },
    '/utilisateurs/{id}': {
      get: { tags: ['Utilisateurs'], summary: 'Obtenir un utilisateur', parameters: [{ name: 'id', in: 'path', required: true }], responses: { '200': { description: 'Succès' } } },
      put: { tags: ['Utilisateurs'], summary: 'Modifier un utilisateur', parameters: [{ name: 'id', in: 'path', required: true }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Utilisateur' } } } }, responses: { '200': { description: 'Modifié' } } },
      delete: { tags: ['Utilisateurs'], summary: 'Supprimer un utilisateur', parameters: [{ name: 'id', in: 'path', required: true }], responses: { '204': { description: 'Supprimé' } } }
    }
  }
};

export const setupSwagger = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
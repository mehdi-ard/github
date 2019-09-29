import { post, get, remove, put } from './api';

export default {
  users: {
    login: async model => {
      return await get({
        api: '/user',
        model
      })
    }
  },

  repo: {
    repoList: async user => {
      return await get({
        api: `/users/${user}/repos`,
      })
    },
    star: async ({ owner, repo }) => {
      return await put({
        api: `/user/starred/${owner}/${repo}`
      })
    },
    unstar: async ({ owner, repo }) => {
      return await remove({
        api: `/user/starred/${owner}/${repo}`
      })
    },
    singleRepo: async ({ owner, repo }) => {
      return await get({
        api: `/repos/${owner}/${repo}`
      })
    },
    contentRepo: async ({ owner, repo }) => {
      return await get({
        api: `/repos/${owner}/${repo}/contents`
      })
    },
    contentItem: async ({ owner, repo, item }) => {
      return await get({
        api: `/repos/${owner}/${repo}/contents/${item}`
      })
    },
    commits: async ({ owner, repo }) => {
      return await get({
        api: `/repos/${owner}/${repo}/commits`
      })
    },
    branch: async ({ owner, repo }) => {
      return await get({
        api: `/repos/${owner}/${repo}/branches`
      })
    },
    releases: async ({ owner, repo }) => {
      return await get({
        api: `/repos/${owner}/${repo}/releases`
      })
    },
    contributor: async ({ owner, repo }) => {
      return await get({
        api: `/repos/${owner}/${repo}/contributors`
      })
    },
    issues: async ({ owner, repo }) => {
      return await get({
        api: `/repos/${owner}/${repo}/issues`
      })
    },
    addIssues: async ({ owner, repo, model }) => {
      return await post({
        api: `/repos/${owner}/${repo}/issues`,
        model
      })
    },
  },


  gists: {
    gistsList: async owner => {
      return await get({
        api: `/gists`,
      })
    },
    addGist: async ({ owner, model }) => {
      return await post({
        api: `/gists`,
        model
      })
    },
  },
  emoji: {
    getEmoji: async model => {
      return await get({
        api: '/emojis',
        model
      })
    }
  }

};

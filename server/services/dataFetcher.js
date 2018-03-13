import config from '../config';

export default const fetcher = {
  fetchSummary = () => {
    return fetch(config.SUMMARY_API_URL)
        .then(results => {
            return results;
        })
  }
}

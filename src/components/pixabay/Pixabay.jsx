import axios from 'axios';

const PIXABAY_API_KEY = '40929284-7575d21e88d2f3b61b50c775f';

const pixabayService = {
  searchImages: async (inputValue, page) => {
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
      inputValue
    )}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        const { hits, totalHits } = response.data;
        return { images: hits, totalHits };
      } else {
        throw new Error(
          `Error fetching images: [ERROR ${response.status}] ${response.statusText}`
        );
      }
    } catch (error) {
      throw new Error(`Error fetching images: ${error.message}`);
    }
  },
};

export default pixabayService;

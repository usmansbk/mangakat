import { connect } from 'react-redux'
import MangaContent from '../components/MangaContent'
import {
  selectManga,
  fetchManga,
  Status,
  addFavorite,
  removeFavorite,
} from '../redux/actions';

const hasFailed = (status) => (status === Status.FETCH_MANGA_FAILURE);
const getManga = (mangas, mangaName) => (mangas.byId[mangaName]);
const getLastRead = (mangas, mangaId) => {
  const manga = mangas[mangaId];
  const result = {
    lastChapter: manga.lastChapter || 1,
    lastPage: manga.lastPage || 1
  }
  return result;
}

const mapStateToProps = state => {
	return {
		manga: getManga(state.mangas, state.selectedManga),
    favorites: state.favorites,
    mangas: state.mangas.byId,
    mangaId: state.selectedManga,
    failed: hasFailed(state.status),
    lastRead: getLastRead(state.mangas.byId, state.selectedManga),
	}
}

const mapDispatchToProps = dispatch => {
  return {
    onEnter: (mangaId, mangas) => {
      const manga = mangas[mangaId];
      const isUpdated = manga && manga.isUpdated
      dispatch(selectManga(mangaId));
      if (!isUpdated) dispatch(fetchManga(mangaId));
    },
    handleFavorite: (mangaId, favorites) => {
      const hasManga = favorites.indexOf(mangaId) !== -1;
      hasManga? dispatch(removeFavorite(mangaId)) : dispatch(addFavorite(mangaId));
    }
  }
}

const MangaContentContainer = connect(
	mapStateToProps,
  mapDispatchToProps
)(MangaContent)

export default MangaContentContainer
import React from 'react';
import { withRouter } from 'react-router';
import M from 'materialize-css';
import TableItem from './common/TableItem';
import Button from './common/Button';
import Icon from './common/Icon';

class MangaInfoCard extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.state = { dataURL: '/loading.gif' }
	}

	onClick(event) {
		const {
			handleFavorite,
			mangaId,
			history,
			favorites,
			lastRead
		} = this.props;
		const { name } = event.target;
		const url = history.location.pathname + `/${lastRead.lastChapter || 1}`;
		if (name === 'favorite') handleFavorite(mangaId, favorites);
		if (name === 'resume') history.push(`${url}/${lastRead.lastPage || 1}`);
		if (name === 'download') history.push(`/download/${mangaId}`);
	}

	componentDidMount() {
		M.Collapsible.init(document.querySelector('.collapsible'));
	}
	
	componentWillReceiveProps(nextProps) {
		const { getCover, cover } = nextProps;
		getCover(cover).then(dataURL => {
			if (dataURL) this.setState({dataURL})
			else Promise.reject();
		}).catch(() => this.setState({dataURL: '/favicon.ico'}));
	}

	render() {
		const {
			name,
			author,
			genres,
			chapters,
			status,
			yearOfRelease,
			lastUpdate,
			info,
			favorites,
			mangaId,
			lastRead,
		} = this.props;
		const isFavorite = favorites.indexOf(mangaId) !== -1;
		const { lastPage, lastChapter } = lastRead;
		const isResume = (lastPage && lastChapter) && (lastPage > 1 || lastChapter > 1);
		const style = {
			maxHeight: "100%",
			maxWidth: "100%"
		}
		return (
			<div className="col s12 l6">
				<div className="card horizontal">
					<div className="card-image">
						<img alt={name} src={this.state.dataURL} style={style} />
					</div>
					<div className="card-stacked">
						<div className="card-content">
							<span className="card-title grey-text text-darken-4">{name}</span>
							<table>
								<tbody>
									<TableItem title="Author" value={author && author.join(", ")}/>
									<TableItem title="Chapters" value={chapters && chapters.length} />
									<TableItem title="Status" value={status} />
									<TableItem title="Genres" value={genres && genres.join(", ")}/>
									<TableItem title="Released" value={yearOfRelease} />
									<TableItem title="Last Update" value={lastUpdate && new Date(lastUpdate).toDateString()} />
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<section className='center-align'>
					<Button onClick={this.onClick} name='resume'><Icon position='right' name='play_arrow' />{ isResume?'Resume':'Start'}</Button>
					<Button onClick={this.onClick} name='favorite'><Icon position='right' name={'favorite' + (isFavorite?'':'_border')}/>Favorite</Button>
					<Button onClick={this.onClick} name='download'><Icon position='right' name='save'/>Save offline</Button>
				</section>
				<section>
					<ul className="collapsible">
						<li>
							<div className="collapsible-header"><h5>Summary</h5></div>
							<div className="collapsible-body">
								<p className="flow-text">
									{info}
								</p>
							</div>
						</li>
					</ul>
				</section>
			</div>
		);
	}
}

export default withRouter(MangaInfoCard);
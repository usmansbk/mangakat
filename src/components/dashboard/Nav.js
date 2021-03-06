import React from 'react';
import Logo from '../common/Logo';
import Menu from '../common/Menu';
import NavList from '../common/NavList';
import NavItem from '../common/NavItem';
import NavHeader from '../common/NavHeader';
import SearchBar from '../../containers/SearchBar';
import M from 'materialize-css';

export default class Nav extends React.Component {
	componentDidMount() {
		M.Sidenav.init(document.querySelector('.sidenav'));
	}

	render() {
		const { hasUnread } = this.props;
		return (
			<header>
			<div className="navbar-fixed">
				<nav className='teal darken-4'>
					<div className="nav-wrapper">
						<Logo/>
						<Menu/>
						<NavList className="right hide-on-med-and-down">
							<NavItem icon="home" link="/">Home</NavItem>
							<NavItem color={hasUnread?'red-text':''} icon="favorite" link="/favorites">Favorites</NavItem>
							<NavItem icon="help" link="/about">About</NavItem>
						</NavList>
						<SearchBar />
					</div>
				</nav>
			</div>
			<NavList className="sidenav" id="mobile">
				<NavHeader className='teal darken-4'>MangaKat</NavHeader>
				<NavItem className='sidenav-close' icon="home" link="/">Home</NavItem>
				<NavItem color={hasUnread?'red-text':''}className='sidenav-close' icon="favorite" link="/favorites">Favorites</NavItem>
				<NavItem className='sidenav-close' icon="help" link="/about">About</NavItem>
			</NavList>
			</header>
		);
	}
}
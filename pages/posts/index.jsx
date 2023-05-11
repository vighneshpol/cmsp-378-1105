import { NextSeo } from 'next-seo';
import { setOutgoingHeaders } from '../../lib/setOutgoingHeaders';

import PageHeader from '../../components/page-header';
import Layout from '../../components/layout';
import { PostGrid } from '../../components/grid';
import { Paginator } from '@pantheon-systems/nextjs-kit';

import { getFooterMenu } from '../../lib/Menus';
import { getLatestPosts } from '../../lib/Posts';

export default function PostsListTemplate({ menuItems, posts }) {
	const RenderCurrentItems = ({ currentItems }) => {
		return <PostGrid contentType="posts" data={currentItems} />;
	};

	return (
		<Layout footerMenu={menuItems}>
			<NextSeo
				title="Decoupled Next WordPress Demo"
				description="Generated by create-pantheon-decoupled-kit."
			/>
			<div className="max-w-screen-lg mx-auto">
			<PageHeader title="Posts" />
				<section>
					<Paginator
						data={posts}
						itemsPerPage={12}
						Component={RenderCurrentItems}
					/>
				</section>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ res }) {
	const { menuItems, menuItemHeaders } = await getFooterMenu();
	const { posts, headers: postHeaders } = await getLatestPosts(100);

	const headers = [menuItemHeaders, postHeaders];
	setOutgoingHeaders({ headers, res });

	return {
		props: {
			menuItems,
			posts,
		},
	};
}
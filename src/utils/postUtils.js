// utils/postUtils.js

export const fetcher = async (url) => {
	const res = await fetch(url);
	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message);
	}
	return data;
};

export const filterPosts = (posts, searchTerm, filterStatus) => {
	let filtered = posts;

	if (searchTerm) {
		filtered = filtered.filter(
		(post) =>
			post.title.toLowerCase().includes(searchTerm) ||
			post.user.name.toLowerCase().includes(searchTerm)
		);
	}

	if (filterStatus) {
		filtered = filtered.filter((post) => post.status === filterStatus);
	}

	return filtered;
};

export const sortPosts = (posts, sortOrder) => {
	if (sortOrder) {
		return posts.sort((a, b) => {
		if (sortOrder === "asc") {
			return new Date(a.createdAt) - new Date(b.createdAt);
		} else {
			return new Date(b.createdAt) - new Date(a.createdAt);
		}
		});
	}
	return posts;
};

export const paginatePosts = (posts, currentPage, postsPerPage) => {
	const startIndex = (currentPage - 1) * postsPerPage;
	return posts.slice(startIndex, startIndex + postsPerPage);
};

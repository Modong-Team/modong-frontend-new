import { Header } from '../shared';
import styled from 'styled-components';
import MainSidebar from '../pages/main/MainSidebar';
import DefaultLayout from './DefaultLayout';

export default function MainLayout({ children, applicationId }: ChildrenType & MainPageProps) {
	return (
		<DefaultLayout>
			<Header isMain />
			<S.Layout>
				<MainSidebar applicationId={applicationId} />
				{children}
			</S.Layout>
		</DefaultLayout>
	);
}

namespace S {
	export const Layout = styled.div``;
}

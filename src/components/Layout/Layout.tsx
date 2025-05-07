import { FC, ReactNode } from 'react';
import { AppShell, Container } from '@mantine/core';
import Header  from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
  <AppShell
  padding="md"
  layout="alt"
  header={<Header />}
  footer={<Footer />}
  styles={(theme) => ({
    main: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      minHeight: 'calc(100vh - 120px)',
    },
  })}
>
  <Container size="xl" py="xl">
    {children}
  </Container>
</AppShell>
  );
};

export default Layout;

import { 
  Container, 
  Table, 
  TextInput, 
  Text, 
  Badge, 
  Group, 
  Box, 
  LoadingOverlay, 
  Paper, 
  Title,
  useMantineTheme,
  ScrollArea
} from '@mantine/core';
import { IconSearch, IconShip } from '@tabler/icons-react';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface TableWrapperProps<T> {
  data: T[];
  columns: Column<T>[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortField: keyof T;
  sortDirection: 'asc' | 'desc';
  onSortChange: (field: keyof T) => void;
  onRowClick?: (item: T) => void;
  title?: string;
  searchPlaceholder?: string;
}

const TableWrapper = <T extends { id: string }>({
  data,
  columns,
  loading,
  searchQuery,
  onSearchChange,
  sortField,
  sortDirection,
  onSortChange,
  onRowClick,
  title = 'Data Table',
  searchPlaceholder = 'Search...'
}: TableWrapperProps<T>) => {
  const theme = useMantineTheme();

  const SortableHeader = ({ children, field }: { children: React.ReactNode; field: keyof T }) => {
    return (
      <th
        style={{ cursor: 'pointer' }}
        onClick={() => onSortChange(field)}
      >
        <Group spacing="xs">
          {children}
          {sortField === field && (
            <Text size="xs" color="dimmed">
              {sortDirection === 'asc' ? '↑' : '↓'}
            </Text>
          )}
        </Group>
      </th>
    );
  };

  return (
    <Container size="xl" py="md">
      <Box pos="relative" mb="lg">
        <Group position="apart" mb="md">
          <Group>
            <IconShip size={28} color={theme.colors.brand[6]} />
            <Title order={2}>{title}</Title>
          </Group>
          <TextInput
            placeholder={searchPlaceholder}
            icon={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.currentTarget.value)}
            sx={{ width: 300 }}
          />
        </Group>
        
        <Paper withBorder style={{ position: 'relative' }}>
          <LoadingOverlay visible={loading} zIndex={1000} />
          
          <ScrollArea style={{ height: 'calc(100vh - 250px)' }} offsetScrollbars>
            <Table striped highlightOnHover>
              <thead style={{ position: 'sticky', top: 0, backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'white', zIndex: 1 }}>
                <tr>
                  {columns.map((column) => (
                    <SortableHeader key={String(column.key)} field={column.key}>
                      {column.label}
                    </SortableHeader>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center', padding: '30px 0' }}>
                      {loading ? 'Loading...' : 'No data found matching your search criteria.'}
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => onRowClick?.(item)}
                      style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                    >
                      {columns.map((column) => (
                        <td key={String(column.key)}>
                          {column.render ? column.render(item) : String(item[column.key])}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Box>
    </Container>
  );
};

export default TableWrapper;
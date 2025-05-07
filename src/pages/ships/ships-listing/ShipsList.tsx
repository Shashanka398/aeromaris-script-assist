import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getShips } from '../../../api/spacex';
import { notifications } from '@mantine/notifications';
import useTableFilter from '../../../hooks/useTableFilter';
import TableWrapper from '../../../components/ui-components/Table-wrapper';
import Layout from '../../../components/Layout/Layout';
import { Badge } from '@mantine/core';
import styles from './ShipsList.module.scss';
import { useQuery } from '@tanstack/react-query';

interface Ship {
  id: string;
  name: string;
  type: string;
  home_port: string;
  image: string;
  active: boolean;
}

export default function ShipsList() {

  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Ship>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<Ship[]>(['ships'], async () => {
    const response = await getShips();
    return response.data;
  });

  useEffect(() => {
    if (isError) {
      notifications.show({
        title: 'Error while loading ships!!',
        message: 'Not able to load ship listng please try later!!!',
        radius: 'md',
        autoClose: 5000
      });
    }
  }, [isError]);

  const { filteredAndSortedData: filteredAndSortedShips } = useTableFilter<Ship>({
    data: data || [],
    searchQuery,
    sortField,
    sortDirection,
    searchFields: ['name', 'type', 'home_port']
  });

  const handleSortChange = (field: keyof Ship) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const columns = [
    {
      key: 'name' as const,
      label: 'Name',
      render: (ship: Ship) => <a className={styles.shipLink}>{ship.name}</a>
    },
    {
      key: 'type' as const,
      label: 'Type'
    },
    {
      key: 'home_port' as const,
      label: 'Home Port'
    },
    {
      key: 'active' as const,
      label: 'Status',
      render: (ship: Ship) => (
        <Badge color={ship.active ? 'green' : 'red'}>
          {ship.active ? 'Active' : 'Inactive'}
        </Badge>
      )
    }
  ];

  return (
    <Layout>
      <TableWrapper<Ship>
        data={filteredAndSortedShips}
        columns={columns}
        loading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        onRowClick={(ship) => navigate(`/ships/${ship.id}`)}
        title="Ships"
        searchPlaceholder="Search ships..."
      />
    </Layout>
  );
} 
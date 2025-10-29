import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Product from '../../components/items/Product';
import { mockProducts } from '../../utils/mockdata';

const Products = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading] = useState(false);

  const tabs = [
    { label: 'All', value: 'All' },
    { label: 'Food & Drinks', value: 'Food and Drinks' },
    { label: 'Souvenirs', value: 'Souvenirs' },
    { label: 'Others', value: 'Others' },
  ];

  const handleAddNew = () => {
    console.log('Add new product');
  };

  return (
    <CustomTabs
      title="Products"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={tabs}
      data={mockProducts}
      loading={loading}
      onAddNew={handleAddNew}
      addButtonText="Add Product"
      searchColumns={['name', 'category']}
      gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8"
      gap="gap-6"
    >
      {(filteredData) =>
        filteredData.map((product) => (
          <Product key={product._id} product={product} />
        ))
      }
    </CustomTabs>
  );
};

export default Products;

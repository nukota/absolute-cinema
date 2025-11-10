import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Product from '../../components/items/Product';
import { mockProducts } from '../../utils/mockdata';
import CreateProductDialog from '../../components/dialogs/create-dialogs/CreateProductDialog';

const Products = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const tabs = [
    { label: 'All', value: 'All' },
    { label: 'Food', value: 'food' },
    { label: 'Drink', value: 'drink' },
    { label: 'Souvenir', value: 'souvenir' },
    { label: 'Other', value: 'other' },
  ];

  const handleAddNew = () => {
    setOpenCreateDialog(true);
  };

  return (
    <>
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
        tabFilterProperty="category"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8"
        gap="gap-6"
      >
        {(filteredData) =>
          filteredData.map((product) => (
            <Product key={product.product_id} product={product} />
          ))
        }
      </CustomTabs>
      <CreateProductDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
    </>
  );
};

export default Products;

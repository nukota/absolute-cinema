import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Product from '../../components/items/Product';
import { mockProducts } from '../../utils/mockdata';
import type { ProductDTO } from '../../utils/dtos/productDTO';
import CreateProductDialog from '../../components/dialogs/create-dialogs/CreateProductDialog';
import DetailProductDialog from '../../components/dialogs/detail-dialogs/DetailProductDialog';

const Products = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null);

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

  const handleInfoClick = (product: ProductDTO) => {
    setSelectedProduct(product);
    setOpenDetailDialog(true);
  };

  const handleSave = (product: ProductDTO) => {
    console.log('Saving product:', product);
    setOpenDetailDialog(false);
  };

  const handleDelete = () => {
    console.log('Deleting product:', selectedProduct?.product_id);
    setOpenDetailDialog(false);
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
            <Product
              key={product.product_id}
              product={product}
              handleInfoClick={handleInfoClick}
            />
          ))
        }
      </CustomTabs>
      <CreateProductDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
      <DetailProductDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        product={selectedProduct}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Products;

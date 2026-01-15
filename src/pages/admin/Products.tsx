import { useState } from "react";
import CustomTabs from "../../components/layouts/Tabs";
import Product from "../../components/items/Product";
import {
  useAllProducts,
  useDeleteProduct,
  useCreateProduct,
  useUpdateProduct,
} from "../../services/productsService";
import type { ProductDTO } from "../../utils/dtos/productDTO";
import CreateProductDialog from "../../components/dialogs/create-dialogs/CreateProductDialog";
import DetailProductDialog from "../../components/dialogs/detail-dialogs/DetailProductDialog";
import { useFeedback } from "../../provider/FeedbackProvider";

const Products = () => {
  const { data: products, isLoading: loading } = useAllProducts();
  const deleteProductMutation = useDeleteProduct();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const { showSnackbar } = useFeedback();
  const [activeTab, setActiveTab] = useState("All");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
    null
  );

  const tabs = [
    { label: "All", value: "All" },
    { label: "Food", value: "food" },
    { label: "Drink", value: "drink" },
    { label: "Souvenir", value: "souvenir" },
    { label: "Other", value: "other" },
  ];

  const handleAddNew = () => {
    setOpenCreateDialog(true);
  };

  const handleInfoClick = (product: ProductDTO) => {
    setSelectedProduct(product);
    setOpenDetailDialog(true);
  };

  const handleCreateProduct = async (data: any) => {
    try {
      await createProductMutation.mutateAsync(data);
      setOpenCreateDialog(false);
      showSnackbar({
        message: "Product created successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Create product error:", error);
      showSnackbar({
        message: "Failed to create product. Please try again.",
        severity: "error",
      });
    }
  };

  const handleUpdateProduct = (id: string, data: any) => {
    updateProductMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          setOpenDetailDialog(false);
          showSnackbar({
            message: "Product updated successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Update product error:", error);
          showSnackbar({
            message: "Failed to update product. Please try again.",
            severity: "error",
          });
        },
      }
    );
  };

  const handleDelete = () => {
    if (selectedProduct) {
      deleteProductMutation.mutate(selectedProduct.product_id, {
        onSuccess: () => {
          setOpenDetailDialog(false);
          showSnackbar({
            message: "Product deleted successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Delete product error:", error);
          showSnackbar({
            message: "Failed to delete product. Please try again.",
            severity: "error",
          });
        },
      });
    }
  };

  return (
    <>
      <CustomTabs
        title="Products"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
        data={products || []}
        loading={loading}
        onAddNew={handleAddNew}
        addButtonText="Add Product"
        searchColumns={["name", "category"]}
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
        onCreate={handleCreateProduct}
      />
      <DetailProductDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Products;

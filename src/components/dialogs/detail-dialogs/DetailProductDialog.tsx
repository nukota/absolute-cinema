import { useState, useEffect } from "react";
import DetailDialog from "../template/DetailDialog";
import type { FormSection } from "../template/DetailDialog";
import type { ProductDTO } from "../../../utils/dtos/productDTO";
import { ProductCategory } from "../../../utils/enum";

interface DetailProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductDTO | null;
  onUpdate: (id: string, data: any) => void;
  onDelete?: () => void;
}

const DetailProductDialog: React.FC<DetailProductDialogProps> = ({
  open,
  onClose,
  product,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<ProductDTO | null>(
    product
  );
  const [error, setError] = useState("");

  // Reset editing state when dialog closes
  useEffect(() => {
    if (!open) {
      setIsEditing(false);
    }
  }, [open]);

  // Sync editedProduct with product prop when it changes
  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProduct(product);
  };

  const handleSave = () => {
    if (!editedProduct) return;

    // Validation
    if (!editedProduct.name.trim()) {
      setError("Product name is required");
      return;
    }
    if (editedProduct.price <= 0) {
      setError("Price must be greater than 0");
      return;
    }
    if (!editedProduct.category) {
      setError("Category is required");
      return;
    }

    onUpdate(editedProduct.product_id, {
      name: editedProduct.name.trim(),
      category: editedProduct.category,
      price: editedProduct.price,
      image: editedProduct.image?.trim() || "",
    });

    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedProduct(product);
      setError("");
    } else {
      onClose();
    }
  };

  const categoryOptions = [
    { value: ProductCategory.Food, label: "Food" },
    { value: ProductCategory.Drink, label: "Drink" },
  ];

  const sections: FormSection[] = [
    {
      title: "Product Information",
      fields: [
        {
          name: "name",
          label: "Product Name",
          type: "text",
          placeholder: "Enter product name",
          value: editedProduct?.name || "",
          onChange: (value) =>
            setEditedProduct((prev) =>
              prev ? { ...prev, name: value } : null
            ),
        },
        {
          name: "category",
          label: "Category",
          type: "autocomplete",
          placeholder: "Select category",
          value:
            categoryOptions.find(
              (opt) => opt.value === editedProduct?.category
            ) || null,
          options: categoryOptions,
          getOptionLabel: (option: any) => option.label,
          onChange: (value) =>
            setEditedProduct((prev) =>
              prev ? { ...prev, category: value?.value } : null
            ),
        },
        {
          name: "price",
          label: "Price",
          type: "number",
          placeholder: "Enter price",
          value: editedProduct?.price || 0,
          onChange: (value) =>
            setEditedProduct((prev) =>
              prev ? { ...prev, price: Number(value) } : null
            ),
        },
        {
          name: "image",
          label: "Image URL",
          type: "text",
          placeholder: "Enter image URL",
          value: editedProduct?.image || "",
          onChange: (value) =>
            setEditedProduct((prev) =>
              prev ? { ...prev, image: value } : null
            ),
        },
      ],
    },
  ];

  return (
    <DetailDialog
      open={open}
      onClose={onClose}
      title="Product Details"
      sections={sections}
      error={error}
      isEditable={isEditing}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={onDelete}
      showImage="image"
    />
  );
};

export default DetailProductDialog;

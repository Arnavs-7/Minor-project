import { useState } from "react";
import { useAdmin, AdminProduct } from "@/context/AdminContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

const InventoryTable = () => {
  const { products, loading, fetchProducts, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<AdminProduct>>({
    name: "", category: "Keychains", price: 0, stock: 0, image_url: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  const handleSave = async () => {
    if (editingProduct) {
      await updateProduct({ ...formData, id: editingProduct.id });
      setEditingProduct(null);
    } else {
      await addProduct(formData);
      setIsAddOpen(false);
    }
    setFormData({ name: "", category: "Keychains", price: 0, stock: 0, image_url: "" });
  };

  const openEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData(product);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header & Controls */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-semibold">Inventory</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your products and stock</p>
        </div>

        <div className="flex gap-3">
          <form onSubmit={handleSearch} className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="pl-9 h-10 w-full"
            />
          </form>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="h-10 bg-noir text-white hover:bg-noir/90">
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" className="col-span-3" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input id="category" className="col-span-3" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">Price</Label>
                  <Input id="price" type="number" className="col-span-3" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">Stock</Label>
                  <Input id="stock" type="number" className="col-span-3" value={formData.stock} onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })} />
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">Save Product</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Edit Dialog (Hidden) */}
      <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <Input className="col-span-3" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Price</Label>
              <Input type="number" className="col-span-3" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Stock</Label>
              <Input type="number" className="col-span-3" value={formData.stock} onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })} />
            </div>
          </div>
          <Button onClick={handleSave} className="w-full">Update Product</Button>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-10">Loading...</TableCell></TableRow>
            ) : products.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-10">No products found</TableCell></TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium whitespace-nowrap">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">₹{product.price}</TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${product.stock < 5 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(product)} className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      <Edit2 className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>This will permanently delete this product.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteProduct(product.id)} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryTable;

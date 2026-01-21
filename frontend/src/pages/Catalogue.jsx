import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { catalogueCategories, catalogueProducts } from '../data/mock';

const Catalogue = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = catalogueProducts.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">Collection</p>
          <h1 className="text-5xl md:text-6xl font-light tracking-wide text-stone-900 mb-6">Catalogue</h1>
          <p className="text-lg text-stone-500 leading-relaxed">
            Découvrez notre sélection d'éléments décoratifs haut de gamme pour sublimer vos intérieurs.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-20 z-40 bg-stone-50/95 backdrop-blur-sm border-y border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border-stone-200 rounded-none focus:ring-stone-900 focus:border-stone-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              <Filter className="w-4 h-4 text-stone-400 flex-shrink-0" />
              {catalogueCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-none text-xs tracking-wider whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-stone-900 text-white border-stone-900 hover:bg-stone-800'
                      : 'bg-transparent text-stone-600 border-stone-300 hover:bg-stone-100 hover:border-stone-400'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-[10px] opacity-60">({category.count})</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-stone-500">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-square overflow-hidden bg-stone-100 mb-4 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.isNew && (
                  <Badge className="absolute top-4 left-4 bg-stone-900 text-white rounded-none text-[10px] tracking-wider">
                    NOUVEAU
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                    Voir détails
                  </span>
                </div>
              </div>
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2">{product.designer}</p>
              <h3 className="text-lg font-light tracking-wide text-stone-900 mb-1">{product.name}</h3>
              <p className="text-sm text-stone-500 line-clamp-2">{product.description}</p>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500">Aucun produit ne correspond à votre recherche.</p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 rounded-none"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-square lg:aspect-auto lg:h-full">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 lg:relative lg:top-0 lg:right-0 lg:float-right text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                {selectedProduct.isNew && (
                  <Badge className="bg-stone-900 text-white rounded-none text-[10px] tracking-wider mb-4">
                    NOUVEAU
                  </Badge>
                )}
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2">
                  {selectedProduct.designer}
                </p>
                <h2 className="text-3xl font-light tracking-wide text-stone-900 mb-4">
                  {selectedProduct.name}
                </h2>
                <p className="text-stone-500 leading-relaxed mb-8">
                  {selectedProduct.description}
                </p>
                <div className="border-t border-stone-200 pt-6">
                  <div className="mb-4">
                    <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">Matériau</p>
                    <p className="text-stone-900">{selectedProduct.material}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">Catégorie</p>
                    <p className="text-stone-900 capitalize">
                      {catalogueCategories.find(c => c.id === selectedProduct.category)?.name}
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full mt-8 bg-stone-900 hover:bg-stone-800 text-white rounded-none py-6 text-sm tracking-wider uppercase"
                  onClick={() => setSelectedProduct(null)}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogue;

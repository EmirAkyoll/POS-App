import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import './style.css'

const Categories = ({ products, categories, setCategories, setFiltered }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('All');

  useEffect(() => {
    if (categoryTitle === 'All') {
      setFiltered(products)
    }else{
      setFiltered(products.filter((product) => product.category === categoryTitle))
    }
  }, [products, categoryTitle, setFiltered])

  return (
    <ul className="flex gap-3 text-lg | md:flex-col md:mb-0">
      {categories.map((category) => {
        return (
          <li
            className={`category-item ${category.title === categoryTitle && "!bg-pink-900"}`}
            key={category._id}
            onClick={() => setCategoryTitle(category.title)}
          >
            <span className="select-none">{category.title}</span>
          </li>
        )
      })
      }
      <li className="category-item !bg-purple-900 hover:opacity-90" onClick={() => { setIsAddModalOpen(true) }}>
        <PlusOutlined className='md:text-2xl' />
      </li>
      <li className="category-item !bg-amber-900 hover:opacity-90" onClick={() => { setIsEditModalOpen(true) }}>
        <EditOutlined className='md:text-2xl' />
      </li>

      <ModalAdd
        categories={categories}
        setCategories={setCategories}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      <ModalEdit

        categories={categories}
        setCategories={setCategories}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />

    </ul>
  )
}

export default Categories;

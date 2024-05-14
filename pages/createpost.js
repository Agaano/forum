import { customSelectStyles } from '@/components/customSelectStyles'
import { themes } from '@/components/themes'
import styles from '@/styles/postForm.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import Select from 'react-select'

const PostForm = ({ data }) => {
	const router = useRouter()

	const [image, setImage] = useState(null)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [categories, setCategories] = useState('')
	const [loading, setLoading] = useState(false)
	const [image1, setImage1] = useState('')
	const [image2, setImage2] = useState('')
	const [image3, setImage3] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		const blbo = new Blob([image], { type: 'application/octet-stream' })
		const formdata = new FormData()
		formdata.append('author', data.name)
		formdata.append('title', title)
		formdata.append('image', blbo)
		formdata.append('image1', image1)
		formdata.append('image2', image2)
		formdata.append('image3', image3)
		formdata.append('description', description)
		formdata.append('categories', categories)

		const response = await fetch('api/addPost', {
			method: 'POST',
			body: formdata,
		})
		if (response.ok) {
			setImage(null)
			setTitle('')
			setDescription('')
			setCategories('')
			router.push('/')
		}
	}

	const handleChangeImage = async e => {
		if (e.target.files.length !== 0) {
			const file = e.target.files[0]
			setImage(file)
		}
	}
	if (data.isLogged)
		return (
			<form className={styles.postForm} onSubmit={handleSubmit}>
				<div className={styles.formGroup}>
					<div className={styles.fileInput}>
						<input
							type='file'
							id='image'
							onChange={handleChangeImage}
							placeholder='Загрузите картинку'
							required
							accept='image/*'
							max={5242880}
						/>
						<label htmlFor='image'>
							<span>Выберите картинку</span>
							{image && <span className={styles.fileName}>{image.name}</span>}
						</label>
					</div>
				</div>
				<div className={styles.formGroup}>
					<div className={`${styles.selectBlock} ${styles.customSelect}`}>
						<label htmlFor='categories'>Категория:</label>
						<div className={styles.selectWrapper}>
							<Select
								id='categories'
								onChange={selectedOption => setCategories(selectedOption.value)}
								options={themes.map(({ text, pathname }) => ({
									value: pathname,
									label: text,
								}))}
								styles={customSelectStyles}
								placeholder='Выберите категорию'
								isSearchable={false}
								isClearable={true}
							/>
							<div className={styles.arrow}></div>
						</div>
					</div>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='title'>Заголовок:</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='description'>Описание:</label>
					<textarea
						id='description'
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
					></textarea>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='image1'>
						Ссылка на изображение 1 (необязательно):
					</label>
					<input
						type='text'
						id='image1'
						value={image1}
						onChange={e => setImage1(e.target.value)}
					></input>
					<label htmlFor='image2'>
						Ссылка на изображение 2 (необязательно):
					</label>
					<input
						type='text'
						id='image2'
						value={image2}
						onChange={e => setImage2(e.target.value)}
					></input>
					<label htmlFor='image3'>
						Ссылка на изображение 3 (необязательно):
					</label>
					<input
						type='text'
						id='image3'
						value={image3}
						onChange={e => setImage3(e.target.value)}
					></input>
				</div>
				{loading ? (
					<div className={styles.submit_loader}>
						<TailSpin
							color='#0000ff'
							radius='0'
							width={25}
							height={25}
							visible={true}
						/>
					</div>
				) : (
					<button type='submit'>Добавить пост</button>
				)}
			</form>
		)
	return (
		<>
			Перед тем как написать статью необходимо <Link href='/login'>Войти</Link>
		</>
	)
}

export default PostForm

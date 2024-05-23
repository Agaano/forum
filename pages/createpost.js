import { customSelectStyles } from '@/components/customSelectStyles'
import { themes } from '@/components/themes'
import styles from '@/styles/postForm.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import Select from 'react-select'

const PostForm = ({ data }) => {
	const router = useRouter()

	const [image, setImage] = useState(null)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(false)
	const [image1, setImage1] = useState(null)
	const [image2, setImage2] = useState(null)
	const [image3, setImage3] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		const blobPrev = new Blob([image], { type: 'application/octet-stream' })
		const formdata = new FormData()
		formdata.append('author', data.name)
		formdata.append('title', title)
		formdata.append('image', blobPrev)
		formdata.append('description', description)
		formdata.append('categories', category)

		const response = await fetch('api/addPost', {
			method: 'POST',
			body: formdata,
		})
		console.log(response.status)
		if (response.ok) {
			setImage(null)
			setTitle('')
			setDescription('')
			setCategory('')
			const data = await response.json();
			const formDataImg = new FormData();
			const blobPrev1 = new Blob([image1], { type: 'application/octet-stream' })
			const blobPrev2 = new Blob([image2], { type: 'application/octet-stream' })
			const blobPrev3 = new Blob([image3], { type: 'application/octet-stream' })
			formDataImg.append('id', data.id)
			formDataImg.append('image1', blobPrev1)
			formDataImg.append('image2', blobPrev2)
			formDataImg.append('image3', blobPrev3)
			const response1 = await fetch('api/addPostImages', {
				method: 'POST',
				body: formDataImg
			})

			if (response1.ok) {
				router.push('/')
			} else {
				alert("Картинки не были загружены. Попробуйте снова")
			}

		}
	}

	useEffect(() => {
		(async () => {
			const response = await fetch("api/getCategories")
			const data = await response.json();
			if (response.status >= 400) return;
			setCategories(data.categories)
		})()
	}, [])

	const handleChangeImage = async e => {
		if (e.target.files.length !== 0) {
			const file = e.target.files[0]
			setImage(file)
		}
	}

	const handleChangeImage1 = async e => {
		if (e.target.files.length !== 0) {
			const file = e.target.files[0]
			setImage1(file)
		}
	}
	const handleChangeImage2 = async e => {
		if (e.target.files.length !== 0) {
			const file = e.target.files[0]
			setImage2(file)
		}
	}
	const handleChangeImage3 = async e => {
		if (e.target.files.length !== 0) {
			const file = e.target.files[0]
			setImage3(file)
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
								onChange={selectedOption => setCategory(selectedOption.value)}
								options={categories.map(({ name }) => ({
									value: name,
									label: name,
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
					<div className={styles.fileInput}>
						<input
							type='file'
							id='image1'
							onChange={handleChangeImage1}
							placeholder='Загрузите картинку'
							accept='image/*'
							max={5242880}
						/>
						<label htmlFor='image1'>
							<span>Выберите картинку</span>
							{image1 && <span className={styles.fileName}>{image1.name}</span>}
						</label>
					</div>
					<div className={styles.fileInput}>
						<input
							type='file'
							id='image2'
							onChange={handleChangeImage2}
							placeholder='Загрузите картинку'
							accept='image/*'
							max={5242880}
						/>
						<label htmlFor='image2'>
							<span>Выберите картинку</span>
							{image2 && <span className={styles.fileName}>{image2.name}</span>}
						</label>
					</div>
					<div className={styles.fileInput}>
						<input
							type='file'
							id='image3'
							onChange={handleChangeImage3}
							placeholder='Загрузите картинку'
							accept='image/*'
							max={5242880}
						/>
						<label htmlFor='image3'>
							<span>Выберите картинку</span>
							{image3 && <span className={styles.fileName}>{image3.name}</span>}
						</label>
					</div>
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

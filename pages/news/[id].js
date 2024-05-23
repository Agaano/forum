import getCorrectDate from '@/components/getCorrectDate'
import styles from '@/styles/news.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LineWave } from 'react-loader-spinner'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

export default function NewsDetail({ data }) {
	const router = useRouter()
	const { id } = router.query
	const [newsData, setNewsData] = useState(null)
	const [text, setText] = useState('')
	const [commentsFlag, setCommentsFlag] = useState(false)
	const [commnetIsSending, setCommentsIsSending] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/news/${id}`)
				const data = await response.json()
				console.log(data)
				setNewsData(data)
				setCommentsIsSending(false)
			} catch (error) {
				console.error('Error fetching news:', error)
			}
		}

		if (id) {
			fetchData()
		}
	}, [id, commentsFlag])

	if (!newsData) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<LineWave />
			</div>
		)
	}

	const {
		title,
		userId,
		theme,
		date,
		image,
		description,
		comments,
		image1,
		image2,
		image3,
	} = newsData
	const img = 'data:image/png;base64, ' + Buffer.from(image).toString('base64')
	const img1 = !!image1 ? 'data:image/png;base64, ' + Buffer.from(image1).toString('base64') : ""
	const img2 = !!image2 ? 'data:image/png;base64, ' + Buffer.from(image2).toString('base64') : ""
	const img3 = !!image3 ? 'data:image/png;base64, ' + Buffer.from(image3).toString('base64') : ""

	const images = [img1, img2, img3];

	async function handleSubmit(e) {
		e.preventDefault()
		if (text.trim() === '') {
			return
		}
		if (commnetIsSending) return
		setCommentsIsSending(true)
		const response = await fetch('../api/leaveComment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				postID: id,
				author: data.name,
				text: text,
			}),
		})
		const responseData = await response.json()
		setCommentsFlag(!commentsFlag)
		setText('')
	}

	async function handleDeleteComment(e, commentId) {
		e.preventDefault()
		const response = await fetch('../api/deleteComment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: commentId,
				postID: id,
			}),
		})
		const responseData = await response.json()
		setCommentsFlag(!commentsFlag)
	}

	const settings = {
		adaptiveHeight: true,
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
	}
	return (
		<>
			<Head>
				<title>SpeakUp - {title}</title>
			</Head>

			<div className={styles.newsDetail}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.author}>{userId}</p>
				<p className={styles.theme}>{theme}</p>
				<p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
				<div className={styles.imageContainer}>
					<img className={styles.image} src={img} alt={title} />
				</div>
				<p className={styles.description}>{description}</p>
				<Slider {...settings}>
					{images.map((image, index) => {
					return (
						<div
							key={index}
						>
							<img
								key={index}
								style={{
									width: '70%',
									height: '70%',
									objectFit: 'contain',
									borderRadius: '8px',
									marginInline: "auto",
								}}
								src={image}
								alt={`Image ${index}`}
							/>
						</div>
					);
					})}
				</Slider>
				<div className={styles.comments_block}>
					<h1>Комментарии:</h1>

					{data.isLogged ? (
						<div className={styles.input__wrapper}>
							<textarea
								value={text}
								onChange={e => {
									setText(e.target.value)
									e.target.style.height = 'auto'
									e.target.style.height = e.target.scrollHeight + 'px'
								}}
							/>
							{text.trim() !== '' ? (
								<button onClick={handleSubmit}>
									<img src='../chevron.png' width={30} height={30} />
								</button>
							) : (
								''
							)}
						</div>
					) : (
						''
					)}

					<ul>
						{[...comments]
							.reverse()
							.map(({ id, text, userId, date }, index) => (
								<li key={index} style={{ '--delay': index.toString() }}>
									<h2>{userId}</h2>
									<h3>{getCorrectDate(date)}</h3>
									<span>{text}</span> <br />
									{data.name === 'admin' || data.name === userId ? (
										<button
											onClick={e => {
												handleDeleteComment(e, id)
											}}
										>
											Удалить комментарий
										</button>
									) : (
										''
									)}
								</li>
							))}
					</ul>
				</div>
			</div>
		</>
	)
}

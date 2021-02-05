import React, { useState } from 'react';
import * as Types from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { selectIssueById } from './selectors';
import { selectCurrentPlayer } from '../players/selectors';
import { selectGameId } from '../games/selectors';
import { addComment } from '../games/actions';
import { Avatar, Button, Heading, Pane, Paragraph, Text, Textarea } from 'evergreen-ui';

interface Props {
	issueId: Types.IssueId;
}

export default function IssueModal(props: Props) {
	const gameId = useSelector(selectGameId)!;
	const issue = useSelector((state: Types.RootState) => selectIssueById(state, props.issueId));
	const epic = useSelector((state: Types.RootState) => selectIssueById(state, issue.epicId));
	const player = useSelector(selectCurrentPlayer);

	const [comment, setComment] = useState('');
	const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
		setComment(event.target.value);

	const dispatch = useDispatch();
	const handleAddComment = () => {
		if (!comment) {
			return;
		}
		dispatch(addComment(gameId, player.playerId, issue.id, comment));
	};

	const pointsLabel =
		issue.currentPoints === 1 ? `${issue.currentPoints} point` : `${issue.currentPoints} points`;

	return (
		<Pane>
			<Heading size={500}>
				{issue.key} • {issue.type} • {issue.status} {issue.currentPoints && `• ${pointsLabel}`}
			</Heading>
			<Heading size={800} marginTop="6px">
				{issue.title}
			</Heading>
			{!!issue.description && (
				<>
					<Heading size={100} marginTop="30px">
						Description
					</Heading>
					<Paragraph
						size={500}
						marginTop="-1em"
						marginBottom="0"
						dangerouslySetInnerHTML={{ __html: issue.description }}></Paragraph>
				</>
			)}
			{!!issue.acceptanceCriteria && (
				<>
					<Heading size={100} marginTop="30px">
						Acceptance criteria
					</Heading>
					<Paragraph
						size={500}
						dangerouslySetInnerHTML={{ __html: issue.acceptanceCriteria }}></Paragraph>
				</>
			)}
			{!!epic && (
				<>
					<Heading size={100} marginTop="30px">
						Epic
					</Heading>
					<Text size={500}>
						{epic.key} • {epic.title}
					</Text>
					<Paragraph size={500} dangerouslySetInnerHTML={{ __html: epic.description }}></Paragraph>
				</>
			)}
			{issue.comments.length > 0 && (
				<>
					<Heading size={100} marginTop="30px">
						Comments
					</Heading>
					{issue.comments.map((comment: Types.Comment, index: number) => (
						<Pane key={index} display="flex" marginBottom="26px">
							<Avatar name={comment.author} size={40} marginRight="10px" marginTop="4px" />
							<Paragraph
								size={500}
								marginTop="-1em"
								marginBottom="-1em"
								dangerouslySetInnerHTML={{ __html: comment.body }}></Paragraph>
						</Pane>
					))}
				</>
			)}
			<Pane display="flex">
				<Avatar name={player.name} size={40} marginRight="10px" marginTop="4px" />
				<Textarea
					id="add-comment"
					placeholder="Add a comment"
					value={comment}
					onChange={handleCommentChange}
				/>
			</Pane>
			<Pane display="flex" flexDirection="row-reverse">
				<Button appearance="primary" onClick={handleAddComment} height={40} marginTop="12px">
					Add comment
				</Button>
			</Pane>
		</Pane>
	);
}

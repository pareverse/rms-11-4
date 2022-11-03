import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			default: ''
		},
		email: {
			type: String,
			required: true
		},
		image: {
			type: String,
			default: ''
		},
		role: {
			type: String,
			default: 'User'
		},
		company: {
			id: {
				type: String,
				default: ''
			}
		},
		archive: {
			type: Boolean,
			default: false
		},
		deleted: {
			type: Boolean,
			default: false
		},
		created: {
			type: String,
			default: ''
		},
		updated: {
			type: String,
			default: ''
		}
	},
	{ timestamps: true }
)

const Users = mongoose.models.Users || mongoose.model('Users', UserSchema)

export default Users

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { observer } from 'mobx-react';

import Masked from '../Masked';
import Progress from '../Progress'
import ClientesContato from './ClientesContato';

const styles = theme => ({
	root: {
		marginTop: 24,
		marginLeft: 24,
		marginRight: 24,
		marginBottom: 90,
		[theme.breakpoints.down('sm')]: {
      marginTop: 16,
      marginLeft: 32,
      marginRight: 32
    },
	},
	fabContainer: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
	fabFrame: {
		position: 'relative'
	},
	fabDone: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	textField: {
		width: '100%'
	},
	formControl: {
		width: '100%'
	}
})

const ClientesForm = observer(class ClientesForm extends Component {

	render() {
		const { 
			classes, 
			cliente, 
			contatos,
			loading,
			error,
			addContato,
			removeContato,
			changeContato,
			handleChange,
			handleBlur,
			handleSubmit,
			isLoaded
		} = this.props

		return(
			<div className={classes.root}>
				{isLoaded ? (
					<div>
						<Grid container spacing={16}>
			  			<Grid item xs={12}>
			  				<FormControlLabel
				          control={
				            <Switch
				              checked={cliente.pessoaFisica}
				              onChange={handleChange.bind(this, 'pessoaFisica')}
				              value="pessoaFisica"
				              color="primary"
				            />
				          }
				          label="Pessoa Física"
				        />
				        <FormControlLabel
				          control={
				            <Switch
				              checked={cliente.parceria}
				              onChange={handleChange.bind(this, 'parceria')}
				              value="parceria"
				              color="primary"
				            />
				          }
				          label="Parceria"
				        />
			  			</Grid>
			  			{cliente.pessoaFisica ? (
			  				<Grid item xs={12} sm={4}>
									<FormControl className={classes.formControl}>
				            <InputLabel htmlFor="cpf">CPF</InputLabel>
				            <Input
				              id="cpf"
				              name="cpf"
				              fullWidth
				              value={cliente.cpf}
				              inputComponent={Masked}
				              inputProps={{
				              	mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
				              	placeholder: 'Insira o CPF',
				              	guide: false
				              }}
				              onChange={handleChange.bind(this, 'cpf')}
				            />
				          </FormControl>
				        </Grid>
			  			) : null}
			  			{!cliente.pessoaFisica ? (
				  			<Grid item xs={12} sm={4}>
				          <FormControl className={classes.formControl}>
				            <InputLabel htmlFor="cnpj">CNPJ</InputLabel>
				            <Input
				              id="cnpj"
				              name="cnpj"
				              fullWidth
				              value={cliente.cnpj}
				              inputComponent={Masked}
				              inputProps={{
				              	mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
				              	placeholder: 'Insira o CNPJ',
				              	guide: false,
				              }}
				              onChange={handleChange.bind(this, 'cnpj')}
				              onBlur={handleBlur.bind(this, 'cnpj')}
				            />
				          </FormControl>
				        </Grid>
			  			) : null}
			        <Grid item xs={12} sm={4}>
								<FormControl className={classes.formControl} error={error && cliente.nome === ''} required aria-describedby="nome">
				          <InputLabel htmlFor="nome">Nome</InputLabel>
				          <Input id="nome" value={cliente.nome} onChange={handleChange.bind(this, 'nome')} />
				          {error && cliente.nome === '' ? (
				          	<FormHelperText id="name-error-text">Insira um nome</FormHelperText>
				          ) : null}
				        </FormControl>
			        </Grid>
			        {!cliente.pessoaFisica ? (
			        	<Grid item xs={12} sm={4}>
				          <TextField
							      id="ie"
							      label="Inscrição Estadual"
							      className={classes.textField}
							      value={cliente.ie}
										onChange={handleChange.bind(this, 'ie')}/>
				        </Grid>
			        ) : null}
		        </Grid>

		        <Grid container spacing={16} style={{ paddingTop: 24 }}>
			        <Grid item xs={12}>
				        <Typography variant="subheading">
					        Contatos
					      </Typography>
					    </Grid>
					  </Grid>

					  {contatos.map((contato) => (
					  	<ClientesContato
					  		changeContato={changeContato}
					  		removeContato={removeContato}
					  		contato={contato}
					  		contatos={contatos}
					  		key={contato.id} />
					  ))}

					  {contatos.length <= 2 ? (
					  	<Grid container spacing={16} style={{ paddingTop: 16 }}>
						  	<Grid item xs={12}>
				          <Button 
				          	variant="outlined" 
				          	color="primary" 
				          	className={classes.button}
				          	style={{ marginRight: 16 }}
				          	onClick={addContato}>
						        Adicionar outro
						      </Button>
				        </Grid>
						  </Grid>
					  ) : null}

			      <Grid container spacing={16} style={{ paddingTop: 24 }}>
			        <Grid item xs={12}>
				        <Typography variant="subheading">
					        Endereço
					      </Typography>
					    </Grid>
			        <Grid item xs={4} sm={2}>
			          <FormControl className={classes.formControl}>
			            <InputLabel htmlFor="cep">CEP</InputLabel>
			            <Input
			              id="cep"
			              name="cep"
			              fullWidth
			              value={cliente.cep}
			              inputComponent={Masked}
			              inputProps={{
			              	mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
			              	placeholder: 'Insira o CEP',
			              	guide: false,
			              }}
			              onChange={handleChange.bind(this, 'cep')}
			              onBlur={handleBlur.bind(this, 'cep')}
			            />
			          </FormControl>
			        </Grid>
			        <Grid item xs={8} sm={4} lg={3}>
			          <TextField
						      id="logradouro"
						      label="Logradouro"
						      className={classes.textField}
						      value={cliente.logradouro}
									onChange={handleChange.bind(this, 'logradouro')}/>
			        </Grid>
			        <Grid item xs={4} sm={2} lg={1}>
			          <TextField
						      id="numero"
						      label="Número"
						      className={classes.textField}
						      value={cliente.numero}
									onChange={handleChange.bind(this, 'numero')}/>
			        </Grid>
			        <Grid item xs={8} sm={4} lg={2}>
			          <TextField
						      id="complemento"
						      label="Complemento"
						      className={classes.textField}
						      value={cliente.complemento}
									onChange={handleChange.bind(this, 'complemento')}/>
			        </Grid>
			        <Grid item xs={5} sm={4} lg={2}>
			          <TextField
						      id="bairro"
						      label="Bairro"
						      className={classes.textField}
						      value={cliente.bairro}
									onChange={handleChange.bind(this, 'bairro')}/>
			        </Grid>
			        <Grid item xs={5} sm={4} lg={2}>
			          <TextField
						      id="cidade"
						      label="Cidade"
						      className={classes.textField}
						      value={cliente.cidade}
									onChange={handleChange.bind(this, 'cidade')}/>
			        </Grid>
			        <Grid item xs={2} sm={4} lg={1}>
			          <TextField
						      id="uf"
						      label="UF"
						      className={classes.textField}
						      value={cliente.uf}
									onChange={handleChange.bind(this, 'uf')}/>
			        </Grid>
			      </Grid>

			      <Grid container spacing={16} style={{ paddingTop: 24 }}>
			        <Grid item xs={12}>
				        <Typography variant="subheading">
					        Observações
					      </Typography>
					    </Grid>
			        <Grid item xs={12}>
			          <TextField
						      id="observacoes"
						      label="Observações"
						      multiline
						      rowsMax="5"
						      className={classes.textField}
						      value={cliente.observacoes}
									onChange={handleChange.bind(this, 'observacoes')}/>
			        </Grid>
			      </Grid>

			      {cliente.createdAt ? (
			      	<Grid container spacing={8} style={{ paddingTop: 24 }}>
				        <Grid item xs={12}>
				          <Typography variant="body2">
						        Data do cadastro:
						      </Typography>
						      <Typography variant="body1">
						      	{cliente.createdAt}
						      </Typography>
				        </Grid>
				      </Grid>
			      ) : null}

			      <div className={classes.fabContainer}>
			  			<div className={classes.fabFrame}>
					  		<Button 
					  			variant="fab" 
					  			color="primary" 
					  			aria-label="done" 
					  			className={classes.fabDone}
					  			onClick={handleSubmit}>
					        <Icon>done</Icon>
					      </Button>
					    </div>
				    </div>
				   </div>
				) : <Progress/>}
		    <Dialog open={loading}>
          <DialogContent style={{ width: 200 }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <CircularProgress className={classes.progress} size={50} />
              <h3>Salvando...</h3>
            </div>
          </DialogContent>
        </Dialog>
			</div>
		)
	}
})

ClientesForm.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ClientesForm)
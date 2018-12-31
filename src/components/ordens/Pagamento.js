import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Currency from '../Currency';

import pagamentoStore from '../../stores/PagamentoStore';

const Pagamento = observer(function Pagamento(props) {
	const { 
		ordem,
		handleChange, 
    handleChangeUppercase,
    handleChangeUppercaseFirst,
		handleBlur
	} = props

  const { pagamentos } = pagamentoStore

	return (
		<Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant="title">
          Pagamento
        </Typography>
      </Grid>
			<Grid item xs={4}>
	      <FormControl margin="dense" fullWidth>
	        <InputLabel htmlFor="valorPecas">Valor Peças</InputLabel>
	        <Input
	          id="valorPecas"
	          value={ordem.valorPecas ? ordem.valorPecas : '0,00'}
	          onChange={handleChange.bind(this, 'valorPecas')}
	          onBlur={handleBlur}
	          inputComponent={Currency} />
	      </FormControl>
	    </Grid>
	    <Grid item xs={4}>
	      <FormControl margin="dense" fullWidth>
	        <InputLabel htmlFor="valorMo">Valor M.O</InputLabel>
	        <Input
	          id="valorMo"
	          value={ordem.valorMo ? ordem.valorMo : '0,00'}
	          onChange={handleChange.bind(this, 'valorMo')}
	          onBlur={handleBlur}
	          inputComponent={Currency} />
	      </FormControl>
	    </Grid>
	    <Grid item xs={4}>
	      <FormControl margin="dense" fullWidth>
	        <InputLabel htmlFor="valorTotal">Valor Total</InputLabel>
	        <Input
	          id="valorTotal"
	          value={ordem.valorTotal ? ordem.valorTotal : '0,00'}
	          inputComponent={Currency}
	          disabled />
	      </FormControl>
	    </Grid>
	    <Grid item xs={12} md={4}>
        <TextField
          id="condicaoPagamento"
          label="Condição Pag."
          fullWidth
          value={ordem.condicaoPagamento}
          onChange={handleChangeUppercaseFirst.bind(this, 'condicaoPagamento')}
          margin="dense" />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="observacoesPagamento"
          label="Observações Pagamento"
          fullWidth
          value={ordem.observacoesPagamento}
          onChange={handleChangeUppercase.bind(this, 'observacoesPagamento')}
          margin="dense" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl margin="dense" fullWidth>
          <InputLabel htmlFor="formaPagamento">Forma Pagamento</InputLabel>
          <Select
            value={ordem.pagamento}
            onChange={handleChange.bind(this, 'pagamento')}
            input={<Input id="pagamento" />}
          >
            {pagamentos.map((e) => {
              return <MenuItem key={e._id} value={e._id}>{e.nome}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="dataPagamento"
          label="Data Pagamento"
          type="date"
          fullWidth
          margin="dense"
          value={ordem.dataPagamento}
          onChange={handleChange.bind(this, 'dataPagamento')}
          InputLabelProps={{
            shrink: true,
          }} />
      </Grid>
    </Grid>
	)
})

export default Pagamento
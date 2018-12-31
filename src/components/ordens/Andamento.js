import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from 'moment'
import 'moment-timezone'

import { observer } from 'mobx-react';

import andamentoStore from '../../stores/AndamentoStore';
import aprovacaoStore from '../../stores/AprovacaoStore';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    paddingLeft: theme.spacing.unit * 3,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

function getNextButton(ordem) {
  switch(ordem) {
    case 3:
      return 'Fechada';
    case 4:
      return 'Entregue';
    default: 
      return 'Próximo' ;
  }
}

function getStepName(ordem, andamento, aprovacoes) {
  if (andamento.ordem === 2) {
    if (ordem.aprovacao !== null && ordem.andamento.ordem > 2) {
      const aprovacao = aprovacoes.filter((e) => e._id === ordem.aprovacao)[0]
      if (aprovacao !== undefined)
        return aprovacao.nome
    }
  }
  return andamento.nome
}

function getStepDate(ordem, step) {
  switch (step) {
    case 0:
      return moment(ordem.createdAt).format('DD/MM/YYYY kk:mm:ss');
    case 1:
      return ordem.dataHoraOrcamento ? moment(ordem.dataHoraOrcamento).format('DD/MM/YYYY kk:mm:ss') : null;
    case 2:
      return ordem.dataHoraAprovacao ? moment(ordem.dataHoraAprovacao).format('DD/MM/YYYY kk:mm:ss') : null;
    case 3:
      return ordem.dataHoraFechada ? moment(ordem.dataHoraFechada).format('DD/MM/YYYY kk:mm:ss') : null;
    case 4:
      return ordem.dataHoraFechada ? moment(ordem.dataHoraFechada).format('DD/MM/YYYY kk:mm:ss') : null;
    case 5:
      return ordem.dataHoraEntregue ? moment(ordem.dataHoraEntregue).format('DD/MM/YYYY kk:mm:ss') : null;
    default:
      return '';
  }
}

const Andamento = observer(class Andamento extends Component {
	render() {
		const { classes, ordem, handleChange, handleNext, handleBack } = this.props;
    const { aprovacoes } = aprovacaoStore
    const { andamentos } = andamentoStore

    const aprovacao = aprovacoes.filter((e) => e._id === ordem.aprovacao)[0]
    const step = ordem.andamento.ordem

		return (
			<div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="title">
              Andamento
            </Typography>
          </Grid>
        </Grid>
        <Stepper activeStep={step} orientation="vertical">
          {andamentos.map((andamento) => {
            const labelProps = {};
            const iconProps = {};
            labelProps.optional = <Typography variant="caption">{getStepDate(ordem, andamento.ordem)}</Typography>;
            iconProps.completed = true

            return (
              <Step key={andamento.nome}>
                {step === 5 ? (
                  <StepLabel 
                    {...labelProps}
                    {...iconProps}>{getStepName(ordem, andamento, aprovacoes)}</StepLabel>
                ) : (
                  <StepLabel 
                    {...labelProps}>{getStepName(ordem, andamento, aprovacoes)}</StepLabel>
                )}
                
                <StepContent>
                  {andamento.ordem === 2 && ordem.andamento.ordem === 2 ? (
                    <FormControl component="fieldset" required>
                      <RadioGroup
                        aria-label="aprovacao"
                        name="aprovacao"
                        value={ordem.aprovacao}
                        onChange={handleChange.bind(this, 'aprovacao')}
                      >
                        {aprovacoes.map((e) => {
                          return <FormControlLabel key={e._id} value={e._id} control={<Radio />} label={e.nome} />
                        })}
                      </RadioGroup>
                    </FormControl>
                  ) : null}
                  {andamento.ordem > 1 && andamento.ordem < 5 ? (
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          onClick={handleBack.bind(this, andamento.ordem)}
                          className={classes.button}
                          disabled={andamento.ordem === 2}
                        >
                          Voltar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext.bind(this, andamento.ordem)}
                          className={classes.button}
                          disabled={aprovacao && aprovacao.nome === 'Aguardando'}
                        >
                          {getNextButton(andamento.ordem)}
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {step === andamentos.length - 1 && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Button onClick={handleBack.bind(this, ordem.andamento.ordem)} className={classes.button}>
              Reabrir
            </Button>
          </Paper>
        )}
      </div>
		)
	}
})

Andamento.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Andamento)
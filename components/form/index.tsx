'use client'

// Tools
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Types

// Components
import SimpleText from '@/components/simple-text'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Route from '@/components/route'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


const FormBlock: React.FC<any> = ({
  active,
  componentIndex,
  anchor,
  content,
}) => {
  if (!active) return null

  return (
    <section
      id={`${anchor ? anchor : "form-" + componentIndex}`}
      className="form-block w-full flex justify-center px-5"
    >
      <div className={`container flex flex-col justify-center`}>
        <motion.div
          className={`w-full max-w-4xl`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: componentIndex !== 0 ? 0.5 : 0,
            type: "spring",
            duration: 1.5,
          }}
        >
          {content && <SimpleText content={content} />}
          <form action="https://usebasin.com/f/eb50721cda33" method="POST" id="form" >

          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default FormBlock